const BaseError = require('./BaseError')

class NotFoundError extends BaseError {
  statusCode = 404
  code = 40400
  type = 'NOT-FOUND_ERROR'
  name
  errors

  constructor (message, errors) {
    super(message)
    this.errors = errors
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = NotFoundError
