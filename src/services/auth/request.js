const Util = require('../../utils/util')
const { NotFoundError } = require('../../utils/errors')
const constantUser = require(`../../constants/user.constants`)
const constantAuth = require(`../../constants/auth.constants`)
const config = require('../../utils/config')

module.exports = class AuthRequestService {
  constructor({ UserService, UserRepository, LoggerService }) {
    this.UserService = UserService
    this.UserRepository = UserRepository
    this.LoggerService = LoggerService
  }

  request = async (receiver, userId) => {
    const step = this.LoggerService.addStep('AuthRequestService')
    try {
      if (receiver == 'EMAIL' && !config.providerValidator.email) {
        throw new ServerError(
          `Serviço não implementado`,
          [constantAuth.NOT_IMPLEMENTED_EMAIL],
          constantAuth.code
        )
      }

      if (receiver == 'SMS' && !config.providerValidator.sms) {
        throw new ServerError(
          `Serviço não implementado`,
          [constantAuth.NOT_IMPLEMENTED_SMS],
          constantAuth.code
        )
      }

      if (receiver == 'SOCIAL' && !config.providerValidator.social) {
        throw new ServerError(
          `Serviço não implementado`,
          [constantAuth.NOT_IMPLEMENTED_SOCIAL],
          constantAuth.code
        )
      }

      if (receiver == 'EMAIL') {
        const userData = await this.UserRepository.findBy({ id: userId })

        if (!userData) {
          throw new NotFoundError(
            `Usuario não encontrato`,
            [constantUser.NOT_FOUND],
            constantAuth.code
          )
        }

        await this.UserService.sendVerificationCode(
          userId,
          userData.name,
          userData.email
        )

        const data = {
          provider: `VERIFICATRION_CODE`,
          receiver: `EMAIL`,
          identifier: Util.obfuscateEmail(userData.email),
        }

        step.value.addData(data)
        return data
      }
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
