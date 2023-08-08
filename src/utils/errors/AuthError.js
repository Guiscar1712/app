const BaseError = require('./BaseError')

class AuthError extends BaseError {
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
