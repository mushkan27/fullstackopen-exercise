const noCodeHandler = (request, response) => {
    response.status(404).send('no code available to handle this request')
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
  
    if(error.name === 'CastError'){
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    next(error)
  }

  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    } else {
      request.token = null
    }
    next()
  }
  

  module.exports = {
    errorHandler,
    noCodeHandler,
    tokenExtractor
  }