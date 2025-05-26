const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

//testing get method
describe('testing GET method', () => {
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    // Check if blog has 'id' defined
    assert.ok(blog.id, 'Blog post does not have an id property')

    // Check if blog does NOT have '_id' property
    assert.strictEqual(blog._id, undefined, 'Blog post still has _id property')
  })
})

})

after(async () => {
  await mongoose.connection.close()
})