const app = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//create a new user
app.post('/', async(request, response, next) => {
    const body = request.body

  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'username or password missing' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
    name: body.name,
  })
  try{
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }catch(e){
    next(e)
  }
})

//get all users
app.get('/', async(request, response, next) => {
    const result = await User.find({})
    response.json(result)
})

module.exports = app