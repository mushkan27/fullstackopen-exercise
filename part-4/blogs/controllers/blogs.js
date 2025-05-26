const blogRouter = require('express').Router()
const Blog = require('../models/blog')



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

  blogRouter.post('/', async (request, response, next) => {
    try {
      const blog = new Blog(request.body)
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    } catch (error) {
      next(error) // Forward the error to error-handling middleware
    }
  })
  

  module.exports = blogRouter