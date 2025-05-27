const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: "First blog",
      author: "author 1",
      url: 'http://test1.com',
      likes: 1
    },
    {
      title: "Second blog",
      author: "author 2",
      url: 'http://test2.com',
      likes: 2
    }
  ]

  const nonExistingId = async () => {
    const blog = new Blog({
      title: 'Temporary blog',
      author: 'Temp Author',
      url: 'http://example.com/temp',
      likes: 0
    })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
  }
  
  // Function to return all blogs in the database as plain JS objects
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    initialBlogs, nonExistingId, blogsInDb
  }