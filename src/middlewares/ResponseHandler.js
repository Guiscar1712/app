const BaseError = require('../utils/errors/BaseError')

module.exports = class ResponseMiddleware {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  Handler = (data, req, res, next) => {
    if (data instanceof Error) {
      const send = { success: false }

      const error = data

      setErrorResponse(error, send, res)

      this.LoggerService.setResponse({
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        ...send
      })

      return res
    }

    const sendData = {
      success: true,
      data
    }

    let status = 200

    switch (req.method) {
      case 'GET':
        status = 200
        break
      case 'POST':
        status = 201
        break
      case 'PUT':
        status = 202
        break
      default:
        status = 200
        break
    }

    const response = res.status(status).send(sendData)

    this.LoggerService.setResponse({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      ...sendData
    })

    return response
  }
}
function setErrorResponse (error, send, res) {
  if (error instanceof BaseError) {
    send.error = {
      type: error.type,
      code: error.code,
      message: error.message,
      errors: error.serializeErrors()
    }
    return res.status(error.statusCode).json(send)
  }

  send.error = {
    type: error.name,
    code: -1,
    message: error.message,
    stack: error.stack
  }

  return res.status(500).send(send)
}
