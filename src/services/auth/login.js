const { NotFoundError, ValidationError } = require('../../utils/errors')
const constantUser = require(`../../constants/user.constants`)
const constantAuth = require(`../../constants/auth.constants`)
const jwt = require('jsonwebtoken')
const config = require('../../utils/config')
const encrypedCipher = require('./encrypedCipher')
const Util = require('../../utils/util')

module.exports = class AuthLoginService {
  constructor({
    UserRepository,
    MembershipRepository,
    VerificadorTokenValidar,
    LoggerService,
  }) {
    this.UserRepository = UserRepository
    ;(this.MembershipRepository = MembershipRepository),
      (this.VerificadorTokenValidar = VerificadorTokenValidar)
    this.LoggerService = LoggerService
  }

  request = async (provider, userId, token) => {
    const step = this.LoggerService.addStep('AuthLoginService')
    try {
      const user = await this.UserRepository.findBy({ id: userId })
      if (!user) {
        throw new NotFoundError(
          `Registro não encontrado`,
          [constantUser.NOT_FOUND],
          constantAuth.CODE
        )
      }

      const membership = await this.MembershipRepository.findBy({
        UserId: user.id,
      })

      if (provider === 'verification-code') {
        this.verificationCode(token, membership)
      }

      if (provider === 'verification-external-sms') {
        await this.verificationExternalSms(token, user.cpf)
      }

      await this.MembershipRepository.update(membership.id, {
        RecoveryKey: '',
      })

      const data = { token: jwt.sign(user, config.jwtSecret) }
      step.value.addData(data)
      return data
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  verificationCode(token, membership) {
    if (token !== membership.recoveryKey) {
      throw new ValidationError(
        `Parâmetros inválidos`,
        [constantAuth.INVALID_TOKEN],
        constantAuth.CODE
      )
    }

    return true
  }

  async verificationExternalSms(token, document) {
    let vericadorBody = {}

    vericadorBody.sistema = 1

    document = Util.formatCpf(document)
    const data = {
      identificador: document,
      codigo: token,
    }

    vericadorBody.token = encrypedCipher(data)

    const isValid = await this.VerificadorTokenValidar.request(vericadorBody)

    if (!isValid) {
      throw new ValidationError(
        `Parâmetros inválidos`,
        [constantAuth.INVALID_TOKEN],
        constantAuth.CODE
      )
    }

    return true
  }
}
