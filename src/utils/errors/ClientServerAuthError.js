const BaseError = require('./BaseError')

class ClientServerAuthError extends BaseError {
  errorCode = 500
  errorType = 'CLIENT-SERVER-AUTH_ERROR'
  errors

  constructor (message, errors) {
    super(message)
    this.errors = errors
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = ClientServerAuthError
