const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

let persons = [
    {   
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.use(morgan('tiny'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

const timeElapsed = Date.now()
const today = new Date(timeElapsed)

app.get('/info', (request, response) => {
    var responseText = 'The phonebook currently contains ' + persons.length + ' entries.<br>'
    responseText += '<br>Request was made on ' + today
    response.send(responseText)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    min = Math.ceil(0)
    max = Math.floor(999)
    return (
        Math.floor(Math.random() * (max - min + 1) + min)
        // The max and min are inclusive
    )
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if ((!body.name) || (!body.number)) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const names = persons.map(person => person.name)

    if (names.includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)