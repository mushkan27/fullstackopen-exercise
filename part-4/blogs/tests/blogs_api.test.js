const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./blogs_helper')

const api = supertest(app)

let authToken = null

beforeEach(async () => {
  // Clear DB
  await User.deleteMany({})
  await Blog.deleteMany({})

  // Create a test user
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'testpassword'
  }
  await api.post('/api/users').send(newUser)

  // Log in the user to get a token
  const loginResponse = await api
    .post('/api/login')
    .send({ username: newUser.username, password: newUser.password })

  authToken = loginResponse.body.token

  // Add initial blogs linked to user
  const user = await User.findOne({ username: newUser.username })
  for (const blog of helper.initialBlogs) {
    let blogObj = new Blog({ ...blog, user: user._id })
    await blogObj.save()
    user.blogs = user.blogs.concat(blogObj._id)
  }
  await user.save()
})

describe('testing GET method', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)  // add token here
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`)
    response.body.forEach(blog => {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })
})


describe('testing POST method', () => {
  test('a valid blog can be added with token', async () => {
    const newBlog = {
      title: 'New blog post',
      author: 'New Author',
      url: 'http://newblog.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)  // <---- add token here

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes(newBlog.title))
  })

  test('if likes property is missing, it defaults to 0', async () => {
    const newBlogWithoutLikes = {
      title: 'Blog without likes',
      author: 'No Likes Author',
      url: 'http://nolikes.com'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title is rejected with 400 Bad Request', async () => {
    const newBlog = {
      author: 'Missing Title',
      url: 'http://missingtitle.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('blog without url is rejected with 400 Bad Request', async () => {
    const newBlog = {
      title: 'Missing URL',
      author: 'Missing URL Author',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('adding a blog fails with 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Unauthorized blog post',
      author: 'No Token Author',
      url: 'http://notoken.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('testing DELETE method', () => {
  test('a blog can be deleted by its creator', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    const ids = blogsAtEnd.map(blog => blog.id)
    assert.ok(!ids.includes(blogToDelete.id))
  })

  test('deleting a blog without token fails with 401', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
})
