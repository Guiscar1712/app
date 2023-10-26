const BaseError = require('./BaseError')

class ServerError extends BaseError {
  statusCode = 500
  code
  level = 'ERROR'
  type
  errors
  stack

  constructor(message, errors, code = 500) {
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

module.exports = ServerError
