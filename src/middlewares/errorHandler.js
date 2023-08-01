const { NotFoundError, ClientServerError } = require('../utils/errors')
const ValidationError = require('../utils/errors/ValidationError')
const logger = require('../utils/logger.util')

const errorHandler = (error, req, res, next) => {
  logger.error(JSON.stringify(error, Object.getOwnPropertyNames(error)))

  if (error instanceof ValidationError) {
    res.status(error.errorCode).json({
      type: error.errorType,
      errorCode: error.errorCode,
      message: error.message,
      errors: error.serializeErrors()
    })
  }

  if (error instanceof NotFoundError) {
    res.status(error.errorCode).json({
      type: error.errorType,
      errorCode: error.errorCode,
      message: error.message,
      errors: error.serializeErrors()
    })
  }

  if (error instanceof ClientServerError) {
    res.status(error.errorCode).json({
      type: error.errorType,
      errorCode: error.errorCode,
      message: error.message,
      errors: error.serializeErrors()
    })
  }

  res.status(500).send('Something went wrong')

  return res
}

module.exports = errorHandler
