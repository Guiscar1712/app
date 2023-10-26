const BaseError = require('./BaseError')

class NotFoundError extends BaseError {
  statusCode = 404
  code
  level = 'WARN'
  type
  errors
  stack

  constructor(message, errors, code = 404) {
    super(message)
    this.code = code
    this.errors = errors
    this.type = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors() {
    return this.errors
  }
}

module.exports = NotFoundError
