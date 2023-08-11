const BaseError = require('../utils/errors/BaseError')

const logger = require('../utils/logger.util')

const errorHandler = (error, req, res, next) => {
  logger.error(JSON.stringify(error, Object.getOwnPropertyNames(error)))

  const send = {}

  if (error instanceof BaseError) {
    send.error = {
      type: error.type,
      errorCode: error.code,
      message: error.message,
      errors: error.serializeErrors()
    }
    return res.status(error.statusCode).json(send)
  }

  res.status(500).send('Something went wrong')

  return res
}

module.exports = errorHandler
