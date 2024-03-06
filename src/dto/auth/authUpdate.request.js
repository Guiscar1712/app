const { updateValidate } = require('../../validators/auth')
const { ValidationError } = require('../../utils/errors')
const constants = require('../../constants/auth.constants')
const Util = require('../../utils/util')

class AuthRecoveryRequest {
  constructor(data) {
    this.isValidate(data)

    this.setEmail(data.email)
    this.setPhone(data.phone)
  }

  isValidate(data) {
    const contract = updateValidate(data)
    if (!contract.isValid()) {
      throw new ValidationError(
        'Parâmetros inválidos',
        contract.errors(),
        constants.CODE
      )
    }
  }

  setEmail(email) {
    if (email) {
      this.email = email
    }
  }

  setPhone(phone) {
    if (phone) {
      this.phone = Util.getNumbers(phone)
    }
  }
}

module.exports = AuthRecoveryRequest
