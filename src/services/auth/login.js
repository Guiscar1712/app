const { NotFoundError, ValidationError } = require('../../utils/errors')
const constantUser = require(`../../constants/user.constants`)
const constantAuth = require(`../../constants/auth.constants`)
const jwt = require('jsonwebtoken')
const config = require('../../utils/config')
const encrypedCipher = require('./encrypedCipher')

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

  request = async (provider, receiver, userId, key) => {
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
        this.verificationCode(key, membership)
      }

      if (provider === 'verification-external') {
        await this.verificationExternal(user, key)
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

  verificationCode(key, membership) {
    if (key !== membership.recoveryKey) {
      throw new ValidationError(
        `Parâmetros inválidos`,
        [constantAuth.INVALID_KEY],
        constantAuth.CODE
      )
    }
  }

  async verificationExternal(receiver, key, document) {
    let vericadorBody = {}
    if (reciver === 'sms') {
      vericadorBody.sistema = 1
    } else {
      throw new ValidationError(
        `Parâmetros inválidos`,
        [constantAuth.INVALID_KEY],
        constantAuth.CODE
      )
    }

    const data = {
      identificador: document,
      codigo: key,
    }

    vericadorBody.token = encrypedCipher(data)

    await this.VerificadorTokenValidar.request(vericadorBody)
  }
}
