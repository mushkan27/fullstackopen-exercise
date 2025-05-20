
const { PORT } = require('./utils/config')
const { info } = require('./utils/logger')
const app = require('./app')

// const PORT = 3003
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})