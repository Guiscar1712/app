const BaseError = require('./BaseError')

class AuthError extends BaseError {
  statusCode = 401
  code = 100
  type

  constructor (errors) {
    super('Usuário não Authenticado')
    Object.setPrototypeOf(this, AuthError.prototype)

    this.type = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = AuthError
