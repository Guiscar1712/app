const BaseError = require('./BaseError')

class ClientServerError extends BaseError {
  statusCode = 500
  code = 400
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

module.exports = ClientServerError
