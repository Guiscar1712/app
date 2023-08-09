const BaseError = require('./BaseError')

class AuthError extends BaseError {
  statusCode = 401
  code = 100
  level = 'WARN'
  type
  errors
  stack

  constructor (errors) {
    super('Usuário não Authenticado')
    this.errors = errors

    Object.setPrototypeOf(this, AuthError.prototype)

    this.type = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors () {
    return this.errors
  }
}

module.exports = AuthError
