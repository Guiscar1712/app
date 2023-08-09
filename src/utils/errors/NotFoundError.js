const BaseError = require('./BaseError')

class NotFoundError extends BaseError {
  statusCode = 404
  code = 200
  level = 'WARN'
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

module.exports = NotFoundError
