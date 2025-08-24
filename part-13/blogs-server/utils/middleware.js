require('dotenv').config()
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User, Session } = require('../models/index')

// middleware to extract user from token and validate session
const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }

  const token = authorization.substring(7)
  try {
    const decodedToken = jwt.verify(token, SECRET)
    const user = await User.findByPk(decodedToken.id)

    if (!user) return res.status(401).json({ error: 'token invalid' })
    if (user.disabled) return res.status(403).json({ error: 'user disabled' })

    // Check if session exists
    const session = await Session.findOne({ where: { token, userId: user.id } })
    if (!session) return res.status(401).json({ error: 'session expired' })

    req.user = user
    req.token = token
    next()
  } catch (err) {
    return res.status(401).json({ error: 'token invalid' })
  }
}

module.exports = { tokenExtractor }
