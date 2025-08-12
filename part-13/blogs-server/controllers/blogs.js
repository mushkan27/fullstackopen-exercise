const app = require('express').Router()
const { Blog } = require('../models/index')


app.get('/', async(req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

app.post('/', async(req,res) => {
    // try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    // } catch (error) {
    //     return res.status(400).json({ error })
    // }
})

app.delete('/:id', async (req, res) => {
  const id = req.params.id

  // try {
    const blog = await Blog.findByPk(id)

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    blog.deleted = true // or blog.isDeleted = true
    await blog.save()

    res.status(204).end()
  // } catch (error) {
  //   console.error(error)
  //   res.status(500).json({ error: 'Something went wrong' })
  // }
})

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { likes } = req.body;
  
    if (likes === undefined) {
      return res.status(400).json({ error: "Missing 'likes' field in request body" });
    }
  
    // try {
      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      blog.likes = likes;
      await blog.save();
  
      res.json(blog);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: 'Failed to update likes' });
    // }
  });
  

module.exports = app