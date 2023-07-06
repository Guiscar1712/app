class CustomError extends Error {
  errorCode
  errorType
  constructor (message, errors) {
    super(message)
  }

  serializeErrors () {
    throw new Error('Method must be implemented')
  }
}

module.exports = CustomError
