

const express = require('express')
const mongoose = require('mongoose')
const { mongoUrl,PORT } = require('./utils/config')
const { info } = require('./utils/logger')

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
const Blog = mongoose.model('Blog', blogSchema)


mongoose.connect(mongoUrl)
  .then(() => {
    info('✅ Connected to MongoDB')
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message)
  })


app.use(express.json())


app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

// const PORT = 3003
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})