class BaseError extends Error {
  statusCode
  code
  level
  type
  stack

  constructor (message, errors) {
    super(message)
    this.type = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors () {
    throw new Error('Method must be implemented')
  }
}

module.exports = BaseError
