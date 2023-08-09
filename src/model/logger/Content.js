const { v4: uuidv4 } = require('uuid')
const obscureSensitiveData = require('./../../extensions/obscureSensitiveData')
const MessageResponse = require('../../dto/logger/MessageResponse')
const MessageResquest = require('../../dto/logger/MessageRequest')
class Content {
  constructor (data) {
    this.id = uuidv4()
    this._indexs = data._indexs
    this.endpoint = data.endpoint
    this.type = data.type
    this.steps = {}
    this.addRequest(data.request)
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
