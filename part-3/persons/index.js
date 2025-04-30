
const express = require('express')
const app = express()

// app.use(express.json()); 

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/",(request, response) => {
    response.send("<h1>Hello World</h1>")
  })

app.get("/api/persons",(request, response) => {
    response.json(persons)
  })

  app.get("/info",(request, response)=>{
    response.send(`Phonebook has info for ${persons.length} people. <br> ${Date()}`)
  })

  app.get('/api/persons/:id', (request, response)=>{
    const myId = Number(request.params.id);
    const myPerson = persons.find((person)=>person.id === myId);
    if(myPerson){
      response.json(myPerson);
    }else{
      response.status(404).send(`There are no persons at ${myId}`)
    }
  })

  app.delete("/api/persons/:id", (request, response)=>{
    const myId = Number(request.params.id);
    persons = persons.filter((person)=>person.id !== myId)
    response.status(204).send(`The note at id ${myId} has been deleted`)
  })


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)