const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { User, Session } = require('../models/index')
const { SECRET } = require('../utils/config')

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username } })
  const passwordCorrect = password === 'secret' // replace with real hash check

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  if (user.disabled) {
    return res.status(403).json({ error: 'user disabled' })
  }

  const userForToken = { username: user.username, id: user.id }
  const token = jwt.sign(userForToken, SECRET, { expiresIn: '1h' })

  // Save session in DB
  await Session.create({ userId: user.id, token })

  res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = router
