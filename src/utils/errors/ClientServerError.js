const BaseError = require('./BaseError')

class ClientServerError extends BaseError {
  errorCode = 500
  errorType = 'CLIENT-SERVER_ERROR'
  errors

  constructor (message, errors) {
    super(message)
    this.errors = errors
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = ClientServerError
