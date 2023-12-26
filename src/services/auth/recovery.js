const Util = require('../../utils/util')
const { NotFoundError, ValidationError } = require('../../utils/errors')
const ClientServerNotFoundError = require('../../utils/errors/ClientServerNotFoundError')
const constantUser = require(`../../constants/user.constants`)
const constantAuth = require(`../../constants/auth.constants`)
const jwt = require('jsonwebtoken')
const config = require('../../utils/config')

module.exports = class AuthValidatorService {
  constructor({ UserService, UserRepository, IngressoClient, LoggerService }) {
    this.UserService = UserService
    this.UserRepository = UserRepository
    this.IngressoClient = IngressoClient
    this.LoggerService = LoggerService
  }

  request = async (authRecovery) => {
    const step = this.LoggerService.addStep('AuthValidatorService')
    try {
      const document = Util.getNumbers(authRecovery.document)
      let user = await this.UserRepository.findBy({ Cpf: document })
      let backboneData = await this.IngressoClient.backbone(document)

      this.dataCompare(backboneData, authRecovery)

      const data = {
        token: jwt.sign(user, config.jwtSecret, {
          expiresIn: config.jwtExpiresInRecovery,
        }),
        email: user.email,
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

  dataCompare(backboneData, authRecovery) {
    if (backboneData) {
      const errors = []

      const name = Util.calculateLevenshteinDistance(
        authRecovery.name,
        backboneData.name
      )

      if (name > 2) {
        errors.push(constantAuth.INVALID_NAME)
      }

      const motherName = Util.calculateLevenshteinDistance(
        authRecovery.motherName,
        backboneData.motherName
      )

      if (motherName > 2) {
        errors.push(constantAuth.INVALID_MOTHER_NAME)
      }

      const birthday =
        Util.dateToString(authRecovery.birthday) ==
        Util.dateToString(backboneData.birthday)

      if (!birthday) {
        errors.push(constantAuth.INVALID_BIRTHDAY)
      }

      if (errors > 1) {
        throw new ValidationError(
          `Dados não confere`,
          errors,
          constantAuth.CODE
        )
      }
    }
  }
}
