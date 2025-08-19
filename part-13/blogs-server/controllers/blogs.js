const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Blog, User } = require('../models')
const { SECRET } = require('../utils/config')
const { Op } = require('sequelize')

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

// GET all blogs
router.get('/', async (req, res) => {
  const where = {}
  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } }
    ]
  }
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['id', 'username', 'name']
    },
    where
  })
  res.json(blogs)
})

// POST create a new blog (only logged-in users)
router.post('/', tokenExtractor, async (req, res) => {
  const body = req.body

  const blog = await Blog.create({
    ...body,
    userId: req.user.id
  })

  res.json(blog)
})

// DELETE blog (only owner can delete)
router.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  // check if blog belongs to logged-in user
  if (blog.userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized to delete this blog' })
  }

  await blog.destroy()
  res.status(204).end()
})

// PUT update blog likes
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { likes } = req.body

  if (likes === undefined) {
    return res.status(400).json({ error: "Missing 'likes' field in request body" })
  }

  const blog = await Blog.findByPk(id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  blog.likes = likes
  await blog.save()
  res.json(blog)
})

module.exports = router
