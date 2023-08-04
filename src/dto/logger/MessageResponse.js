class MessageResponse {
  constructor (data) {
    this.status = data.statusCode
    this.message = data.statusMessage
    this.data = data.data
    this.error = data.error
  }
}

module.exports = MessageResponse
