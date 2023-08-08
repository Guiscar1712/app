const BaseError = require('./BaseError')

class ClientServerAuthError extends BaseError {
  statusCode = 500
  code = 50000
  type = 'CLIENT-SERVER-AUTH_ERROR'
  name = 'ClientServerAuthError'
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
