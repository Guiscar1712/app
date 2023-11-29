const Util = require('../../utils/util')
const { NotFoundError, ServerError } = require('../../utils/errors')
const constantUser = require(`../../constants/user.constants`)
const constantAuth = require(`../../constants/auth.constants`)
const config = require('../../utils/config')

module.exports = class AuthRequestService {
  constructor({ UserService, UserRepository, LoggerService }) {
    this.UserService = UserService
    this.UserRepository = UserRepository
    this.LoggerService = LoggerService
  }

  request = async (provider, receiver, userId) => {
    const step = this.LoggerService.addStep('AuthRequestService')
    try {
      let data

      this.providerIsValid(provider, receiver)

      if (provider === 'verification-code') {
        data = await this.verificationCode(receiver, userId, data)
      }

      if (provider === 'verification-external') {
        data = await this.verificationExternal(receiver, userId, data)
      }

      step.value.addData(data)
      return data
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async verificationCode(receiver, userId, data) {
    if (receiver == 'EMAIL') {
      const userData = await this.UserRepository.findBy({ id: userId })

      if (!userData) {
        throw new NotFoundError(
          `Registro não encontrado`,
          [constantUser.NOT_FOUND],
          constantAuth.code
        )
      }

      await this.UserService.sendVerificationCode(
        userId,
        userData.name,
        userData.email
      )

      data = {
        provider: `verification-code`,
        receiver: `email`,
        identifier: Util.obfuscateEmail(userData.email),
      }
    }
    return data
  }

  async verificationExternal(receiver, userId, data) {
    throw new ServerError(
      `Serviço não implementado`,
      [constantAuth.NOT_IMPLEMENTED_PROVIDER],
      constantAuth.CODE
    )
  }

  providerIsValid(provider, receiver) {
    receiver = receiver.toLowerCase()

    const isValid =
      !config.providerValidator[provider] ||
      !config.providerValidator[provider][receiver]

    if (isValid) {
      throw new ServerError(
        `Serviço não implementado`,
        [constantAuth.NOT_IMPLEMENTED_PROVIDER],
        constantAuth.CODE
      )
    }
  }
}
