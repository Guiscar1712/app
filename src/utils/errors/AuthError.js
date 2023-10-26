const BaseError = require('./BaseError')

class AuthError extends BaseError {
  statusCode = 401
  code
  level = 'WARN'
  type
  errors
  stack

  constructor(errors, code = 401) {
    super('Usuário não Authenticado')
    this.code = code
    this.errors = errors

    Object.setPrototypeOf(this, AuthError.prototype)

    this.type = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors() {
    return this.errors
  }
}

module.exports = AuthError
