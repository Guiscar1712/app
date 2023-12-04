const Util = require('../../utils/util')
const { NotFoundError, ValidationError } = require('../../utils/errors')
const ClientServerNotFoundError = require('../../utils/errors/ClientServerNotFoundError')
const constantUser = require(`../../constants/user.constants`)
const constantAuth = require(`../../constants/auth.constants`)
const config = require('../../utils/config')
const database = require('../../database/config.database')

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

  request = async (document) => {
    const step = this.LoggerService.addStep('AuthValidatorService')
    try {
      document = Util.getNumbers(document)
      let userData = await this.UserRepository.findBy({ Cpf: document })

      if (!userData) {
        const personalData = await this.UserService.personalDataGet(document)
        userData = await this.userRegister(userData, personalData, document)
      }

      const providers = this.getProvidersValidator(userData)

      const data = {
        userId: userData.id,
        name: userData.name,
        providers,
      }

      step.value.addData(data)

      return data
    } catch (error) {
      if (error instanceof ClientServerNotFoundError) {
        throw new NotFoundError(
          `Registro não encontrado`,
          [constantUser.NOT_REGISTER_CPF],
          constantAuth.CODE
        )
      }

      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async userFindByEmail(personalEmail) {
    return await this.UserRepository.findBy({
      Email: personalEmail.email,
    })
  }

  async userRegister(userData, personalData, document) {
    const userEmail = userData?.email
    const personalEmail = personalData?.emails.find((f) => f.main)
    const personalPhone = personalData?.telephones.find(
      (f) => (f.main && f.type == 'MOVEL') || f.type == 'MOVEL'
    )

    if (!userEmail) {
      const userEmailData = await this.userFindByEmail(personalEmail)
      if (userEmailData) {
        throw new ValidationError(
          `Parâmetros inválidos`,
          [
            {
              code: constantAuth.DIVERGENT_REGISTRATION.code,
              message: Util.stringFormat(
                constantAuth.DIVERGENT_REGISTRATION.message,
                Util.obfuscateEmail(personalEmail.email)
              ),
            },
          ],
          constantAuth.CODE
        )
      }

      userData = {
        name: personalData.name,
        email: personalEmail.email,
        cpf: document,
        birthday: personalData.birthdate,
        phone: Util.getNumbers(personalPhone.number),
      }

      const transaction = await database.transaction()
      const user = await this.UserRepository.insert(userData, transaction)
      await this.MembershipRepository.insert({ UserId: user.id }, transaction)
      await transaction.commit()

      userData.id = user.id
    }

    return userData
  }

  getProvidersValidator(userData) {
    const validators = []
    const providers = Object.keys(config.providerValidator)
    providers.forEach((provider) => {
      const receivers = Object.keys(config.providerValidator[provider])

      receivers.forEach((receiver) => {
        if (config.providerValidator[provider][receiver]) {
          const identifier = this.getIdentifier(receiver, userData)

          if (!identifier) return

          validators.push({
            provider: provider,
            receiver: receiver,
            identifier: identifier,
          })
        }
      })
    })

    return validators
  }

  getIdentifier(receiver, userData) {
    if (receiver === 'email') {
      if (userData.email) return Util.obfuscateEmail(userData.email)

      return null
    }
    if (receiver === 'sms') {
      if (userData.phone) return Util.obfuscatePhone(userData.phone)

      return null
    }
    if (receiver === 'whatsapp') {
      if (userData.phone) return Util.obfuscatePhone(userData.phone)

      return null
    }
    if (receiver === 'social') {
      return 'social'
    }

    throw new ServerError(
      `Serviço não implementado`,
      [constantAuth.NOT_IMPLEMENTED_PROVIDER],
      constantAuth.CODE
    )
  }
}
