const BaseError = require('./BaseError')

class NotFoundError extends BaseError {
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
