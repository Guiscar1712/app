const BaseError = require('./BaseError')

class NotFoundError extends BaseError {
  statusCode = 404
  code = 40400
  type = 'NOT-FOUND_ERROR'
  name = 'NotFoundError'
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
