const router = require('express').Router()
const { Blog } = require('../models')
const { Sequelize } = require('sequelize')

// GET /api/authors
router.get('/', async (req, res) => {
  const authorsStats = await Blog.findAll({
    attributes: [
      'author',
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'articles'],
      [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes']
    ],
    group: ['author'],
    order: [[Sequelize.fn('SUM', Sequelize.col('likes')), 'DESC']]
  })

  const result = authorsStats.map(a => ({
    author: a.author,
    articles: Number(a.dataValues.articles),
    likes: Number(a.dataValues.likes)
  }))

  res.json(result)
})

module.exports = router
