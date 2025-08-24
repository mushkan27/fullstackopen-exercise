const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_lists')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: 'reading_lists', as: 'readings' })
Blog.belongsToMany(User, { through: 'reading_lists', as: 'readers' })


// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = { Blog, User, ReadingList }