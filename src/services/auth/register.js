const { ValidationError } = require('../../utils/errors')
const constantAuth = require(`../../constants/auth.constants`)
const database = require('../../database/config.database')
const { registerExistValidate } = require('../../validators/auth')
const AuthRegisterResponse = require('../../dto/auth/authRegister.response')

module.exports = class AuthValidatorService {
  constructor({
    UserService,
    UserRepository,
    MembershipRepository,
    LoggerService,
  }) {
    this.UserService = UserService
    this.UserRepository = UserRepository
    this.MembershipRepository = MembershipRepository
    this.LoggerService = LoggerService
  }

  request = async (authRegister) => {
    const step = this.LoggerService.addStep('AuthRegisterService')
    try {
      await this.userExistsValidator(authRegister)

      const userData = await this.userRegister(authRegister)

      step.value.addData(userData)

      return userData
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async userExistsValidator(authRegister) {
    let userSearch = await this.UserRepository.findByCpfOrEmailOrPhone(
      authRegister.document,
      authRegister.email,
      authRegister.phone
    )

    if (userSearch) {
      const userSearchDocument = userSearch.find(
        (f) => f.cpf === authRegister.document
      )
      const userSearchEmail = userSearch.find(
        (f) => f.email === authRegister.email
      )
      const userSearchPhone = userSearch.find(
        (f) => f.phone === authRegister.phone
      )

      const contract = registerExistValidate({
        document: userSearchDocument,
        email: userSearchEmail,
        phone: userSearchPhone,
      })

      if (!contract.isValid()) {
        throw new ValidationError(
          'Parâmetros inválidos',
          contract.errors(),
          constantAuth.CODE
        )
      }
    }
  }

  async userRegister(authRegister) {
    const userDataInsert = {
      name: authRegister.name,
      email: authRegister.email,
      cpf: authRegister.document,
      phone: authRegister.phone,
      optin: authRegister.optin,
    }

    const transaction = await database.transaction()
    const user = await this.UserRepository.save(userDataInsert, transaction)
    await this.MembershipRepository.insert({ UserId: user.id }, transaction)
    await transaction.commit()

    const userData = new AuthRegisterResponse(user)

    return userData
  }
}
