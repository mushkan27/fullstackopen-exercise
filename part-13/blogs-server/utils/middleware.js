require('dotenv').config()
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User } = require('../models/index')

// middleware to extract user from token
const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), SECRET)
      if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
      }
      req.user = await User.findByPk(decodedToken.id)
    } catch (err) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { tokenExtractor }