const CustomError = require('./CustomError')

class NotFoundError extends CustomError {
  errorCode = 404
  errorType = 'NOT-FOUND_ERROR'
  errors

  constructor (message, errors) {
    super(message)
    this.errors = errors
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = NotFoundError
