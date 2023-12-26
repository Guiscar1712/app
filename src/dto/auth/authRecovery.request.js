const { recoveryValidate } = require('../../validators/auth')
const { ValidationError } = require('../../utils/errors')
const constants = require('../../constants/auth.constants')
const Util = require('../../utils/util')

class AuthRecoveryRequest {
  constructor(data) {
    this.isValidate(data)

    this.userId = data.userId
    this.name = data.name
    this.document = data.document
    this.birthday = new Date(data.birthday)
    this.motherName = data.motherName
  }

  isValidate(data) {
    const contract = recoveryValidate(data)
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
