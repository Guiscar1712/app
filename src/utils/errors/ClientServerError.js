const BaseError = require('./BaseError')

class ClientServerError extends BaseError {
  stausCode = 500
  code = 500
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

module.exports = ClientServerError
