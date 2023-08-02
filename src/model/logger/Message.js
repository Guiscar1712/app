const { v4: uuidv4 } = require('uuid')
const obscureSensitiveData = require('./../../extensions/obscureSensitiveData')
const MessageResponse = require('../../dto/logger/MessageResponse')
class Message {
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
    let data = new MessageResponse(request)
    data = obscureSensitiveData(data)
    this.request = data
  }

  AddResponse (data) {
    this.response = obscureSensitiveData(data)
  }
}

module.exports = Message
