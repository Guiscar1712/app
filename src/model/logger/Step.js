const moment = require('moment')
const obscureSensitiveData = require('./../../extensions/obscureSensitiveData')
const MessageRequest = require('../../dto/logger/MessageRequest')
const MessageResponse = require('../../dto/logger/MessageResponse')
class Step {
  constructor() {
    this.date = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  addData(data) {
    if (!data) {
      return this
    }
    if (data instanceof Error) {
      let { code, message, stack, errors, type, functionError } = data
      code = code ?? -1
      this.data = obscureSensitiveData({
        code,
        message,
        stack,
        errors,
        type,
        functionError,
      })
    } else {
      if (data.request) {
        data.request = new MessageRequest(data.request)
      }

      if (data.response) {
        data.response = new MessageResponse(data.response)
      }

      this.data = obscureSensitiveData(data)
    }
    return this
  }

  finalize() {
    const entryDate = moment(this.date)
    const endDate = moment()
    this.duration = moment.duration(endDate.diff(entryDate)).asMilliseconds()

    return this
  }
}

module.exports = Step
