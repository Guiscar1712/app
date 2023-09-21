const BaseError = require('./BaseError')
const MessageRequest = require('./../../dto/logger/MessageRequest')
class ClientServerError extends BaseError {
  statusCode = 500
  code = 400
  level = 'ERROR'
  type
  errors
  stack

  constructor(message, errors) {
    super(message)
    this.errors = errors
    this.type = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.serializeErrorsRequest()
  }

  serializeErrors() {
    return this.errors
  }

  serializeErrorsRequest() {
    if (this.errors?.request) {
      this.errors.request = new MessageRequest(this.errors.request)
    }
    return this.errors
  }
}

module.exports = ClientServerError
