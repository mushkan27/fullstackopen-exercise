const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// Create a test user and generate a JWT token for them
const createTestUserAndGetToken = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password123', 10)
  const user = new User({ username: 'testuser', passwordHash, name: 'Test User' })
  const savedUser = await user.save()

  // Add user id to each blog (important if you want blogs linked to user)
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => ({ ...blog, user: savedUser._id }))
  await Blog.insertMany(blogObjects)

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  return { token, user: savedUser }
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  createTestUserAndGetToken
}
