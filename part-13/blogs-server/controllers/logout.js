const router = require('express').Router()
const { Session } = require('../models/index')
const { tokenExtractor } = require('../utils/middleware')

router.delete('/logout', tokenExtractor, async (req, res) => {
  // Remove the current token from sessions
  await Session.destroy({ where: { token: req.token } })
  res.status(204).end()
})

module.exports = router
