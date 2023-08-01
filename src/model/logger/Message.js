const { v4: uuidv4 } = require('uuid')

class Message {
  _steps
  constructor (data) {
    this.id = uuidv4()
    this._indexs = data._indexs
    this.request = data.request
    this.endpoint = data.endpoint
    this.type = data.type
    this.steps = {}
  }

  AddStep (name, data) {
    this.steps[name] = data
  }

  AddResponse (data) {
    this.response = data
  }
}

module.exports = Message
