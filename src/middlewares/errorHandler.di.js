const { NotFoundError, ClientServerError } = require('../utils/errors')
const ValidationError = require('../utils/errors/ValidationError')
const logger = require('../utils/logger.util')

module.exports = class ErrorMiddleware {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  Handler = (error, req, res, next) => {
    let send = {}

    if (error instanceof ValidationError) {
      send = {
        type: error.type,
        code: error.code,
        message: error.message,
        errors: error.serializeErrors()
      }
      res.status(error.statusCode).json(send)
    } else if (error instanceof NotFoundError) {
      send = {
        type: error.type,
        code: error.code,
        message: error.message,
        errors: error.serializeErrors()
      }
      res.status(error.statusCode).json(send)
    } else if (error instanceof ClientServerError) {
      send = {
        type: error.type,
        code: error.code,
        message: error.message,
        errors: error.serializeErrors()
      }
      res.status(error.statusCode).json(send)
    } else {
      send = 'Something went wrong'
      res.status(500).send(send)
    }

    this.LoggerService.SetResponse({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      send
    })

    return res
  }
}
