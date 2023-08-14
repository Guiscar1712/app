const BaseError = require('./BaseError')

class ServerError extends BaseError {
  statusCode = 500
  code = 500
  level = 'ERROR'
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

module.exports = ServerError
