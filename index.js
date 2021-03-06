require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json()) //adds body to request

const cors = require('cors')
app.use(cors())

morgan.token('body', function(request) {
  const body = request.body
  return JSON.stringify(body)
})

const requestLogger = (tokens, request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms ',
    tokens.body(request, response)
  ].join(' ')
}

const morganMiddlewareFunction = morgan(requestLogger)
app.use(morganMiddlewareFunction)

const timeElapsed = Date.now()
const today = new Date(timeElapsed)

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      var responseText = `The phonebook currently contains ${count} entries.<br>`
      responseText += '<br>Request was made on ' + today
      response.send(responseText)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if ((!body.name) || (!body.number)) {
    return response.status(400).json({
      error: 'Name or number missing!'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    number: body.number
  }

  const opt = {
    new: true,
    runValidators: true
  }

  Person.findByIdAndUpdate(request.params.id, person, opt)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})