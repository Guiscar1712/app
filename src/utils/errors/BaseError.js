class BaseError extends Error {
  statusCode
  code
  level
  type
  stack
  functionError

  constructor (message, errors) {
    super(message)
    this.type = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.extractFunctionName()
  }

  serializeErrors () {
    throw new Error('Method must be implemented')
  }

  extractFunctionName () {
    const stackLines = this.stack.split('\n')
    if (stackLines.length >= 3) {
      const callerInfo = stackLines[1].trim()

      const start = callerInfo.indexOf('at ') + 3
      const end = callerInfo.lastIndexOf(' (')

      if (start !== -1 && end !== -1 && start < end) {
        this.functionError = callerInfo.substring(start, end)
        return
      }
    }
    this.functionError = null
  }
}

module.exports = BaseError
