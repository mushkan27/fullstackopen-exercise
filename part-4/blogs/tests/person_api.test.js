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

//testing post method
describe('testing POST method', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'New blog post',
      author: 'New Author',
      url: 'http://newblog.com',
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
  
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
      .send(newBlog)
      .expect(400)
  })

})

after(async () => {
  await mongoose.connection.close()
})