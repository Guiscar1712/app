const BaseError = require('./BaseError')

class ClientServerAuthError extends BaseError {
  statusCode = 500
  code = 50000
  type
  errors

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

module.exports = ClientServerAuthError
