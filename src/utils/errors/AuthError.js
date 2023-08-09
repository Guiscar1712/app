const BaseError = require('./BaseError')

class AuthError extends BaseError {
  statusCode = 401
  code = 40100
  type = 'AUTH_ERROR'
  name

  constructor (errors) {
    super('Usuário não Authenticado')
    Object.setPrototypeOf(this, AuthError.prototype)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = AuthError
