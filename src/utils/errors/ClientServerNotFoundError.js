const BaseError = require('./BaseError')
const MessageRequest = require('./../../dto/logger/MessageRequest')
const MessageResponse = require('./../../dto/logger/MessageResponse')
class ClientServerNotFoundError extends BaseError {
  statusCode = 404
  code
  level = 'ERROR'
  type
  errors
  stack

  constructor(message, errors, code = 404) {
    super(message)
    this.code = code
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
    if (this.errors?.response) {
      this.errors.response = new MessageResponse(this.errors.response)
    }
    return this.errors
  }
}

module.exports = ClientServerNotFoundError
