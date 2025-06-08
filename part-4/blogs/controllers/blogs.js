const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


//get all blogs
blogRouter.get('/', async(request, response) => {
    //using async-await
    let result = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(result)
  })

  //post a new blogs
  blogRouter.post('/', async (request, response, next) => {
    const { title, url, author, likes } = request.body

    try{
    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' })
    }
      const user = await User.findOne({})
      if(!user){
        return response.status(400).json({ error: 'No user found to assign as creator' })
      }

      const blog = new Blog({ title, url, author, 
        likes: likes || 0,
        user: user.id
       })

       const savedBlog = await blog.save()

      // Add blog to user's blogs array and save user
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
blogRouter.post('/', async (request, response, next) => {
    const { title, url, author, likes } = request.body

    try{
    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' })
    }
      const user = await User.findOne({})
      if(!user){
        return response.status(400).json({ error: 'No user found to assign as creator' })
      }

      const blog = new Blog({ title, url, author, 
        likes: likes || 0,
        user: user.id
       })

       const savedBlog = await blog.save()

      // Add blog to user's blogs array and save user
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)

  } catch (error) {
    next(error)
  }
})
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