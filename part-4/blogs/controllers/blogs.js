const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user') // eslint-disable-line no-unused-vars
const jwt = require('jsonwebtoken') // eslint-disable-line no-unused-vars


//get all blogs
blogRouter.get('/', async(request, response) => {
  //using async-await
  let result = await Blog.find({}).populate('user', { username:1, name:1 })
  response.json(result)
})

// POST a new blog
blogRouter.post('/', async (request, response, next) => {
  const { title, url, author, likes } = request.body
  const user = request.user

  try {
    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog({
      title,
      url,
      author,
      likes: likes || 0,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

// DELETE a blog (only creator can delete)
blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      return response.status(403).json({ error: 'unauthorized: only the creator can delete this blog' })
    }

    await blog.deleteOne()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// UPDATE a blog by id (primarily updating likes)
blogRouter.put('/:id', async (request, response, next) => {
  const { title, url, author, likes } = request.body

  const updatedData = { title, url, author, likes } // only update provided fields

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedData,
      { new: true, runValidators: true }
    )

    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).json({ error: 'blog not found' })
    }
  } catch (error) {
    next(error)
  }
})


module.exports = blogRouter