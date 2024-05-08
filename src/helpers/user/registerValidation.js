const { DuplicateRegister } = require('../../validators/user')
const constants = require('../../constants/user.constants')
const { ValidationError } = require('../../utils/errors')

module.exports = class UserHelpersRegisterValidation {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = (userId, entity, search) => {
    const step = this.LoggerService.addStep('UserHelpersRegisterValidation')
    try {
      const userSearch = search.filter((f) => f.id !== userId)

      if (!userSearch || userSearch.length == 0) {
        return
      }

      const user = {}
      user.cpf = userSearch.find((f) => f.cpf === entity.cpf)?.cpf
      user.email = userSearch.find((f) => f.email === entity.email)?.email
      user.phone = userSearch.find((f) => f.phone === entity.phone)?.phone

      const contract = DuplicateRegister(user)

      if (!contract.isValid()) {
        throw new ValidationError(
          'Dados já cadastrados',
          contract.errors(),
          constants.code
        )
      }
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
