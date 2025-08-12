const { Sequelize } = require('sequelize')
const { DB_CONNECTION } = require('./config')

const sequelize = new Sequelize(DB_CONNECTION, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

module.exports = { sequelize }