require('express-async-errors')
const { connectToDatabase } = require('./utils/db')
const { PORT } = require('./utils/config')

const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
//Centralized error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
  console.error(err.message)

  //Example:handle SequelizeValidationError
  if(err.name === 'SequelizeValidationError'){
    return res.status(400).json({error:err.errors.map(e => e.message)})
  }

  res.status(err.status || 500).json({error:err.message || 'Something went wrong'})
})



const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()