require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const { mongoUrl } = require('./utils/config')
const { info } = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

mongoose.connect(mongoUrl)
  .then(() => {
    info('✅ Connected to MongoDB')
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message)
  })


app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app