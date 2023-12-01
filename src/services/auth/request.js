const Util = require('../../utils/util')
const { NotFoundError, ServerError } = require('../../utils/errors')
const constantUser = require(`../../constants/user.constants`)
const constantAuth = require(`../../constants/auth.constants`)
const config = require('../../utils/config')
const encrypedCipher = require('./encrypedCipher')
module.exports = class AuthRequestService {
  constructor({
    UserService,
    UserRepository,
    LoggerService,
    VerificadorToken,
  }) {
    this.UserService = UserService
    this.UserRepository = UserRepository
    this.LoggerService = LoggerService
    this.VerificadorToken = VerificadorToken
  }

  request = async (provider, receiver, userId) => {
    const step = this.LoggerService.addStep('AuthRequestService')
    try {
      let data

      receiver = receiver.toLowerCase()
      this.providerIsValid(provider, receiver)
      const userData = await this.UserRepository.findBy({ id: userId })
      if (!userData) {
        throw new NotFoundError(
          `Registro não encontrado`,
          [constantUser.NOT_FOUND],
          constantAuth.CODE
        )
      }

      if (provider === 'verification-code') {
        data = await this.verificationCode(receiver, userData)
      }

      if (provider === 'verification-external-sms') {
        data = await this.verificationExternalSms(receiver, userData)
      }

      step.value.addData(data)
      return data
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async verificationCode(receiver, userData) {
    let data

    if (receiver == 'email') {
      if (!userData) {
        throw new NotFoundError(
          `Registro não encontrado`,
          [constantUser.NOT_FOUND],
          constantAuth.CODE
        )
      }

      await this.UserService.sendVerificationCode(
        userData.id,
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

  async verificationExternalSms(receiver, userData) {
    const verificador = config.kroton.captacao

    const cpf = Util.formatCpf(userData.cpf)

    let data = {
      identificador: cpf,
      template: verificador.verificadorSMS,
      contato: userData.phone,
    }

    let encrypted = encrypedCipher(data, verificador)

    const vericadorBody = {
      sistema: 1,
      solicitacao: encrypted,
    }

    await this.VerificadorToken.request(vericadorBody)

    data = {
      provider: `verification-external-sms`,
      receiver: `sms`,
      identifier: Util.obfuscatePhone(userData.phone),
    }

    return data
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
