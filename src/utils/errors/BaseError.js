class BaseError extends Error {
  statusCode
  name
  code
  type
  stack

  constructor (message, errors) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors () {
    throw new Error('Method must be implemented')
  }
}

module.exports = BaseError
