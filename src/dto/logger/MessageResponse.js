class MessageResponse {
  constructor (data) {
    this.aborted = data.aborted
    this.baseUrl = data.baseUrl
    this.body = data.body
    this.complete = data.complete
    this.httpVersion = data.httpVersion
    this.httpVersionMajor = data.httpVersionMajor
    this.httpVersionMinor = data.httpVersionMinor
    this.method = data.method
    this.originalUrl = data.originalUrl
    this.params = data.params
    this.query = data.query
    this.rawHeaders = data.rawHeaders
    this.statusCode = data.statusCode
    this.statusMessage = data.statusMessage
    this.url = data.url
  }
}

module.exports = MessageResponse
