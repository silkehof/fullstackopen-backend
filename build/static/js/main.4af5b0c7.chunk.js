(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{21:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(1),a=t(15),o=t.n(a),u=(t(21),t(6)),i=t(3),s=t(4),l=t.n(s),d="http://localhost:3001/api/persons",b={getAll:function(){return l.a.get(d).then((function(e){return e.data}))},create:function(e){return l.a.post(d,e).then((function(e){return e.data}))},update:function(e,n){return l.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return l.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))}},h=function(e){return Object(c.jsxs)("div",{children:["Filter shown with ",Object(c.jsx)("input",{value:e.filterValue,onChange:e.handleFilterChange})]})},j=function(e){return Object(c.jsxs)("form",{onSubmit:e.addPerson,children:[Object(c.jsxs)("div",{children:["Name: ",Object(c.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(c.jsxs)("div",{children:["Number: ",Object(c.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Add"})})]})},f=function(e){var n=e.person,t=e.removePerson;return Object(c.jsxs)("div",{children:[n.name," ",n.number,Object(c.jsx)("button",{onClick:t,children:"Delete"})]})},m=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"confirmation",children:n})},O=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"error",children:n})},p=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],o=Object(r.useState)(""),s=Object(i.a)(o,2),l=s[0],d=s[1],p=Object(r.useState)(""),v=Object(i.a)(p,2),x=v[0],g=v[1],w=Object(r.useState)(""),C=Object(i.a)(w,2),N=C[0],S=C[1],k=Object(r.useState)(!0),y=Object(i.a)(k,2),P=y[0],A=y[1],D=Object(r.useState)(null),T=Object(i.a)(D,2),U=T[0],F=T[1],E=Object(r.useState)(null),J=Object(i.a)(E,2),V=J[0],B=J[1];Object(r.useEffect)((function(){b.getAll().then((function(e){a(e)}))}),[]);var I=function(e){var n=t.find((function(n){return n.id===e})),c=Object(u.a)(Object(u.a)({},n),{},{number:x});window.confirm("Do you want to update the contact ".concat(n.name," with a new number?"))&&b.update(e,c).then((function(c){a(t.map((function(n){return n.id!==e?n:c}))),F("Success! ".concat(n.name," has been updated in the phonebook.")),setTimeout((function(){F(null)}),5e3),d(""),g("")})).catch((function(c){B("Oh no! The phonebook entry for '".concat(n.name,"' was already removed from the server.")),setTimeout((function(){B(null)}),5e3),a(t.filter((function(n){return n.id!==e}))),d(""),g("")}))},q=P?t:t.filter((function(e){return e.name.toUpperCase().includes(N.toUpperCase())}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Phonebook"}),Object(c.jsx)(m,{message:U}),Object(c.jsx)(O,{message:V}),Object(c.jsx)(h,{filterValue:N,handleFilterChange:function(e){S(e.target.value),""!==N&&A(!1)}}),Object(c.jsx)("h2",{children:"Add new entry"}),Object(c.jsx)(j,{addPerson:function(e){e.preventDefault();for(var n={name:l,number:x},c=0;c<t.length;c++)if(t[c].name.toUpperCase()===n.name.toUpperCase())return void I(t[c].id);b.create(n).then((function(e){a(t.concat(e)),F("Success! ".concat(l," has been added to the phonebook.")),setTimeout((function(){F(null)}),5e3),d(""),g("")}))},newName:l,handleNameChange:function(e){d(e.target.value)},newNumber:x,handleNumberChange:function(e){g(e.target.value)}}),Object(c.jsx)("h2",{children:"Numbers"}),q.map((function(e,n){return Object(c.jsx)(f,{person:e,removePerson:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&b.remove(e).then((function(n){a(t.filter((function(n){return n.id!==e})))}))}(e.id)}},n)}))]})};o.a.render(Object(c.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.4af5b0c7.chunk.js.map