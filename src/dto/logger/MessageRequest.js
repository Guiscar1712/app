class MessageResquest {
  constructor (data) {
    this.url = data.originalUrl
    this.type = data.method
    this.headers = data.headers
    this.body = data.body
    this.params = data.params
    this.query = data.query
  }
}

module.exports = MessageResquest
