require('dotenv').config()

const { Sequelize, QueryTypes } = require('sequelize')

const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

app.get('/api/blogs', async(req, res) => {
    const blogs = await sequelize.query("SELECT * from blogs", { type: QueryTypes.SELECT })
    res.json(blogs)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})