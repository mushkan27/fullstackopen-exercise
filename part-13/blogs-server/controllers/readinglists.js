const express = require('express')
const router = express.Router()
const { User, Blog, ReadingList } = require('../models/index')
const { tokenExtractor } = require('../utils/middleware')

router.post('/', tokenExtractor, async (req, res) => {
  const { userId, blogId } = req.body

  try {
    const user = await User.findByPk(userId)
    const blog = await Blog.findByPk(blogId)

    if (!user || !blog) {
      return res.status(404).json({ error: 'User or blog not found' })
    }

    // create explicit ReadingList entry with read: false
    const readingEntry = await ReadingList.create({
      userId,
      blogId,
      read: false
    })

    res.status(201).json(readingEntry)    
  } catch (error) {
    console.error(error, "error in readinglists")
    return res.status(500).json({ error: 'Internal server error' })
  }
})

//Get single user with reading list + join table info
router.get('/users/:id', async (req, res) => {
  try {
    const { read } = req.query // read = 'true' | 'false' | undefined

    const readingListFilter = {}
    if (read === 'true') readingListFilter.read = true
    else if (read === 'false') readingListFilter.read = false

    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'username'],
      include: [
        {
          model: Blog,
          as: 'readings', // must match your association
          attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
          through: {
            model: ReadingList,
            attributes: ['id', 'read'], // this pulls the join table
            where: Object.keys(readingListFilter).length ? readingListFilter : undefined

          }
        }
      ]
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  try {
    const { read } = req.body
    const readingListId = req.params.id
    const userId = req.user.id // <-- use req.user here

    const readingEntry = await ReadingList.findByPk(readingListId)

    if (!readingEntry) {
      return res.status(404).json({ error: 'Reading list entry not found' })
    }

    if (readingEntry.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized' })
    }

    readingEntry.read = read
    await readingEntry.save()

    res.json(readingEntry)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})



module.exports = router