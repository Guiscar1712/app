const BaseError = require('./BaseError')

class ValidationError extends BaseError {
  statusCode = 400
  code
  level = 'WARN'
  type
  errors
  stack

  constructor(message, errors, code = 400) {
    super(message)
    this.code = code
    this.errors = errors
    this.type = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors() {
    return this.errors
  }
}

module.exports = ValidationError
