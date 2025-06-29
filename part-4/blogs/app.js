require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const config = require('./utils/config')
const { info } = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const { errorHandler, noCodeHandler, tokenExtractor } = require('./utils/middleware')
const usersController = require('./controllers/users')
const loginRouter = require('./controllers/login')


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('✅ Connected to MongoDB')
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message)
  })


app.use(express.json())
app.use(tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersController)
app.use('/api/login', loginRouter)


app.use(noCodeHandler)

app.use(errorHandler)

module.exports = app