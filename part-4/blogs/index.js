

const express = require('express')
const mongoose = require('mongoose')
const { mongoUrl,PORT } = require('./utils/config')
const { info } = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const app = express()




mongoose.connect(mongoUrl)
  .then(() => {
    info('✅ Connected to MongoDB')
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message)
  })


app.use(express.json())

app.use('/api/blogs', blogRouter)


// const PORT = 3003
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})