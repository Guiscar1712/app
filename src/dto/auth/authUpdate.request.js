const { updateValidate } = require('../../validators/auth')
const { ValidationError } = require('../../utils/errors')
const constants = require('../../constants/auth.constants')
const Util = require('../../utils/util')

class AuthRecoveryRequest {
  constructor(data) {
    this.isValidate(data)

    this.email = data.email
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
}

module.exports = AuthRecoveryRequest
