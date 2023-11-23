const { NotFoundError, ValidationError } = require('../../utils/errors')
const constantUser = require(`../../constants/user.constants`)
const constantAuth = require(`../../constants/auth.constants`)
const jwt = require('jsonwebtoken')
const config = require('../../utils/config')

module.exports = class AuthLoginService {
  constructor({ UserRepository, MembershipRepository, LoggerService }) {
    this.UserRepository = UserRepository
    this.MembershipRepository = MembershipRepository
    this.LoggerService = LoggerService
  }

  request = async (provider, userId, key) => {
    const step = this.LoggerService.addStep('AuthLoginService')
    try {
      const user = await this.UserRepository.findBy({ id: userId })
      if (!user) {
        throw new NotFoundError(
          `Registro não encontrado`,
          [constantUser.NOT_FOUND],
          constantAuth.code
        )
      }

      const membership = await this.MembershipRepository.findBy({
        UserId: user.id,
      })
      if (key !== membership.recoveryKey) {
        throw new ValidationError(
          `Parâmetros inválidos`,
          [constantAuth.INVALID_KEY],
          constantAuth.code
        )
      }

      const data = { token: jwt.sign(user, config.jwtSecret) }
      step.value.addData(data)
      return data
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
