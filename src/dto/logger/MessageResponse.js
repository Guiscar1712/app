class MessageResponse {
  constructor (data) {
    this.status = data.statusCode
    this.headers = data.headers
    this.data = data.send
  }
}

module.exports = MessageResponse
