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
    this.AddRequest(data.request)
  }

  AddStep (name, data) {
    this.steps[name] = data
  }

  AddRequest (request) {
    const data = new MessageResquest(request)
    this.request = obscureSensitiveData(data)
  }

  SetUserIdIndex (userId) {
    this._indexs.userId = userId
  }

  AddResponse (response) {
    const data = new MessageResponse(response)
    this.response = obscureSensitiveData(data)
  }
}

module.exports = Content
