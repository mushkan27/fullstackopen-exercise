const blogRouter = require('express').Router()
const Blog = require('../models/blog')


//get all blogs
blogRouter.get('/', async(request, response) => {
    // Blog.find({}).then((blogs) => {
    //   response.json(blogs)
    // }).catch(e => {
    //     next(e)
    // })
    //using async-await
    let result = await Blog.find({})
    response.json(result)
  })
  
  // blogRouter.post('/', (request, response) => {
  //   const blog = new Blog(request.body)
  
  //   blog.save().then((result) => {
  //     response.status(201).json(result)
  //   }).catch(e => {
  //       next(e)
  //   })
  // })

  //post a new blogs
  blogRouter.post('/', async (request, response, next) => {
    const { title, url, author, likes } = request.body
  
    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' })
    }
  
    const blog = new Blog({ title, url, author, likes })
  
    try {
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    } catch (error) {
      next(error)
    }
  })
  
  //delete a blog by id
  blogRouter.delete('/:id', async (request, response, next) => {
    try {
      await Blog.findByIdAndDelete(request.params.id)
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