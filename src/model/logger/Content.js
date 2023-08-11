const { v4: uuidv4 } = require('uuid')
const obscureSensitiveData = require('./../../extensions/obscureSensitiveData')
const MessageResponse = require('../../dto/logger/MessageResponse')
const MessageResquest = require('../../dto/logger/MessageRequest')
class Content {
  constructor (indexs, type, request) {
    this.id = uuidv4()
    this._indexs = indexs
    this.endpoint = request.originalUrl
    this.type = type
    this.steps = {}
    this.addRequest(request)
  }

  addStep (name, data) {
    this.steps[name] = data
  }

  addRequest (request) {
    const data = new MessageResquest(request)
    this.request = obscureSensitiveData(data)
  }

  setUserIdIndex (userId) {
    this._indexs.userId = userId
  }

  addResponse (response) {
    const data = new MessageResponse(response)
    this.response = obscureSensitiveData(data)
  }
}

module.exports = Content
