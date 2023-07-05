const CustomError = require('./CustomError')

class ClientServerError extends CustomError {
  errorCode = 500
  errorType = 'CLIENTSERVER_ERROR'
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
