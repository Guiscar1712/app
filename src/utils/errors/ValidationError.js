const CustomError = require('./CustomError')

class ValidationError extends CustomError {
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
