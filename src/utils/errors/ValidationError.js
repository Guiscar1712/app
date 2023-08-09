const BaseError = require('./BaseError')

class ValidationError extends BaseError {
  statusCode = 400
  code = 400
  type = 'VALIDATION_ERROR'
  name
  errors
  stack

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

module.exports = ValidationError
