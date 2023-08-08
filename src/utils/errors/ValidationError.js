const BaseError = require('./BaseError')

class ValidationError extends BaseError {
  errorCode = 400
  errorType = 'VALIDATION_ERROR'
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
