const BaseError = require('./BaseError')

class ValidationError extends BaseError {
  statusCode = 400
  code = 400
  type = 'VALIDATION_ERROR'
  name = 'ValidationError'
  errors

  constructor (message, errors) {
    super(message)
    this.errors = errors
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = ValidationError
