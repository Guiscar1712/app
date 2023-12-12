class AuthRegisterResponse {
  constructor(data) {
    this.id = data.id
    this.document = data.document
    this.name = data.name
    this.email = data.email
    this.phone = data.phone
    this.optin = data.optin
  }
}

module.exports = AuthRegisterResponse
