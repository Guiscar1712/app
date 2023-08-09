const BaseError = require('./BaseError')

class ValidationError extends BaseError {
  statusCode = 400
  code = 300
  type
  errors
  stack

  constructor (message, errors) {
    super(message)
    this.errors = errors
    this.type = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = ValidationError
