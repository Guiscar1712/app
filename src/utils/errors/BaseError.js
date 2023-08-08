class BaseError extends Error {
  statusCode
  name = 'BaseError'
  code
  type
  stack

  constructor (message, errors) {
    super(message)
  }

  serializeErrors () {
    throw new Error('Method must be implemented')
  }
}

module.exports = BaseError
