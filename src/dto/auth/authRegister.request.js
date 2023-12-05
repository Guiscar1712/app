const { registerValidate } = require('../../validators/auth')
const { ValidationError } = require('../../utils/errors')
const constants = require('../../constants/auth.constants')
const Util = require('../../utils/util')

class AuthRegisterRequest {
  constructor(data) {
    this.isValidate(data)

    this.document = Util.getNumbers(data.document)
    this.name = data.name
    this.email = data.email
    this.phone = Util.getNumbers(data.phone)
    this.optin = data.optin
  }

  isValidate(data) {
    const contract = registerValidate(data)
    if (!contract.isValid()) {
      throw new ValidationError(
        'Parâmetros inválidos',
        contract.errors(),
        constants.CODE
      )
    }
  }
}

module.exports = AuthRegisterRequest
