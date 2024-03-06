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
    this.motherName = data.motherName
    this.setBirthday(data.birthday)
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

  setBirthday(birthday) {
    const day = birthday.slice(8, 10)
    const month = birthday.slice(5, 7)
    const year = birthday.slice(0, 4)

    this.birthday = new Date(year, month - 1, day)
  }
}

module.exports = AuthRecoveryRequest
