const CustomError = require('./CustomError')

class AuthError extends CustomError {
  errorCode = 401
  errorType = 'AUTH_ERROR'

  constructor (errors) {
    super('Usuario não Authenticado')

    Object.setPrototypeOf(this, AuthError.prototype)
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = AuthError
