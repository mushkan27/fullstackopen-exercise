
require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v){
        return /^\d{2,3}-\d+$/.test(v) && v.length >=8
      },
      message: (props) => `${props.value} is not a valid phone number`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)


app.use(express.json())
// app.use(morgan('tiny'))
app.use(cors()) //Enable CORS for all routes
app.use(express.static('dist')) //Serve static files from the build directory

//Defining a custom token for morgan to log the request body for POST request
morgan.token('req-body', (req) => {
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
  return ''
})

//Middleware for logging with custom format
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :req-body'
))


// let persons = [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]


// app.get("/",(request, response) => {
//     response.send("<h1>Hello World</h1>")
//   })

// app.get("/api/persons",(request, response) => {
//     response.json(persons)
//   })

//   app.get("/info",(request, response)=>{
//     response.send(`Phonebook has info for ${persons.length} people. <br> ${Date()}`)
//   })

//   app.get('/api/persons/:id', (request, response)=>{
//     const myId = Number(request.params.id);
//     const myPerson = persons.find((person)=>person.id === myId);
//     if(myPerson){
//       response.json(myPerson);
//     }else{
//       response.status(404).send(`There are no persons at ${myId}`)
//     }
//   })


//   app.delete("/api/persons/:id", (request, response)=>{
//     const myId = Number(request.params.id);
//     persons = persons.filter((person)=>person.id !== myId)
//     response.status(204).send(`The note at id ${myId} has been deleted`)
//   })

//   app.post("/api/persons",(request, response)=>{
//     const myNewPost = request.body;
//     myNewPost.id = Math.floor(Math.random() * 10000)

//     if(!myNewPost.name || !myNewPost.number){
//       response.status(400).send({error: "name or number is missing."})
//     }

//     persons.push(myNewPost)
//     response.status(201).json(myNewPost)
//   })

// let persons = []
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then((result) => {
    if(result){
      response.json(result)
    }else{
      request.status(404).end()
    }
  }).catch((e) => next(e))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number || false,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch((e) => next(e))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((e) => next(e))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new:true, runValidators: true, context: 'query' })
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

//Getting individual data with id
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

app.get('/info', (request, response, next) => {
  Person.find().then(personEntry => {
    response.send(`Phonebook has info for ${personEntry.length} people. <Br /> ${Date()}`)
  }).catch(e => next(e))
})


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

const PORT = process.env.PORT ? process.env.PORT : 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)