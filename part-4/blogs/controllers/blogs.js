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
  
  blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog.save().then((result) => {
      response.status(201).json(result)
    }).catch(e => {
        next(e)
    })
  })

  module.exports = blogRouter