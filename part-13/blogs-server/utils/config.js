require('dotenv').config()

module.exports = {
  DB_CONNECTION: process.env.DB_URL,
  PORT: 3001
}