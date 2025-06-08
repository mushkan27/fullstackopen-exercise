const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


//get all blogs
blogRouter.get('/', async(request, response) => {
    //using async-await
    let result = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(result)
  })

  // POST a new blog
blogRouter.post('/', async (request, response, next) => {
  const { title, url, author, likes } = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' })
    }

    if (!user) {
      return response.status(400).json({ error: 'No user found to assign as creator' })
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

  
  //delete a blog by user who added it only
  blogRouter.delete('/:id', async (request, response, next) => {
    try {
      // Verify and decode the token
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
  
      // Find the blog to be deleted
      const blog = await Blog.findById(request.params.id)
      if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
      }
  
      // Check if the blog's creator matches the user from the token
      if (blog.user.toString() !== decodedToken.id.toString()) {
        return response.status(403).json({ error: 'unauthorized: only the creator can delete this blog' })
      }
  
      // Delete blog if authorization is valid
      await blog.deleteOne()
      response.status(204).end()
  
    } catch (error) {
      next(error)
    }
  })
  

  // UPDATE a blog by id (primarily updating likes)
blogRouter.put('/:id', async (request, response, next) => {
  const { title, url, author, likes } = request.body;

  const updatedData = { title, url, author, likes }; // only update provided fields

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).json({ error: 'blog not found' });
    }
  } catch (error) {
    next(error);
  }
});
  

  module.exports = blogRouter