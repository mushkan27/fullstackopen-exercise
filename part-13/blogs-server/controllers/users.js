const router = require('express').Router()
const { User, Blog } = require('../models')

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
    const user = await User.findByPk(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({error: 'User not found'})
    }
})

router.put('/:username', async (req, res) => {
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