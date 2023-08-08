const BaseError = require('./BaseError')

class ClientServerError extends BaseError {
  stausCode = 500
  code = 500
  type = 'CLIENT-SERVER_ERROR'
  name = 'ClientServerError'
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
