const express = require('express')
const router = express.Router()
const { User, Blog, ReadingList } = require('../models/index')
const { tokenExtractor } = require('../utils/middleware')

router.post('/', tokenExtractor, async (req, res) => {
  const { userId, blogId } = req.body
  console.log(userId, blogId, "userId and blogId")
  try {
    const user = await User.findByPk(userId)
    const blog = await Blog.findByPk(blogId)

    if (!user || !blog) {
      return res.status(404).json({ error: 'User or blog not found' })
    }

    await user.addReading(blog); // uses association
    res.status(201).json({ message: 'Blog added to reading list' });
  } catch (error) {
    console.error(error, "error in readinglists")
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router