const router = require('express').Router()
const { User, Blog } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
          model: Blog,
          attributes: ['id', 'title', 'url', 'likes'] 
        }
      })
    res.json(users)
})

router.post('/', async (req, res) => {
   const { username, name } = req.body
    try {
        const user = await User.create({ username, name })
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: {
          model: Blog,
          as: 'readings',
          attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
          through: { attributes: [] }, // hide join table data
        },
      });
  
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      res.json({
        name: user.name,
        username: user.username,
        readings: user.readings,
      });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

router.put('/:username', tokenExtractor, async (req, res) => {
   const { username } = req.params
   const { newUsername, newName } = req.body

   const user = await User.findOne({ where: { username } })

   if(!user){
    return res.status(404).json({error: 'User not found'})
   }

   if(newUsername){
    user.username = newUsername
   }

   if(newName){
    user.name = newName
   }

   await user.save()
   res.json(user)
   
})

module.exports = router