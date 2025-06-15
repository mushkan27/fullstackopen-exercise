const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./blogs_helper') // eslint-disable-line no-unused-vars
const bcrypt = require('bcrypt')


const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })
  await user.save()
})

describe('user creation validation', () => {
  test('fails with short username', async() => {
    const newUser = {
      username: 'mu',
      name: 'Short User',
      password: 'password22'
    }
    const result = await api.post('/api/users').send(newUser).expect(400)
    assert.strictEqual(result.body.error, 'username must be at least 3 characters long')
  })

  test('fails with short password', async() => {
    const newUser = {
      username: 'muskan',
      name: 'Short password',
      password: 'pw'
    }
    const result = await api.post('/api/users').send(newUser).expect(400)
    assert.strictEqual(result.body.error, 'password must be at least 3 characters long')
  })

  test('fails with missing username', async() => {
    const newUser = {
      name: 'Missing username',
      password: 'password12'
    }
    const result = await api.post('/api/users').send(newUser).expect(400)
    assert.strictEqual(result.body.error, 'username or password missing')
  })

  test('fails with non-unique username', async() => {
    const newUser = {
      username: 'root',
      name: 'Duplicate user',
      password: 'anotherpassword'
    }
    const result = await api.post('/api/users').send(newUser).expect(400)
    assert.strictEqual(result.body.error, 'username must be unique')
  })
})

after(async () => {
  await mongoose.connection.close()
})
