require('dotenv').config()
const jwt = require('jsonwebtoken')
const { ValidationError } = require('../../utils/errors')
const config = require('../../utils/config')
const { comparePassword } = require('../../utils/auth')

module.exports = class UserService {
  constructor ({ UserRepository, MembershipRepository, LoggerService }) {
    this.UserRepository = UserRepository
    this.MembershipRepository = MembershipRepository
    this.LoggerService = LoggerService
  }

  login = async (email, password) => {
    const user = await this.loginFindUser(email)

    const membership = await this.loginFindMembership(user)

    this.loginComparePassword(password, membership, user)

    return { token: jwt.sign(user, config.jwtSecret) }
  }

  async loginFindUser (email) {
    const stepUser = this.LoggerService.AddStep('UserServerLoginUserFindBy')
    const user = await this.UserRepository.findBy({ Email: email })
    if (!user) {
      const error = new ValidationError('Login falhou!', [{ code: 404, message: 'Email não cadastrado!' }])
      stepUser.Finalize({ user, error: { stack: error.stack, message: error.message } })
      throw error
    }
    stepUser.Finalize(user)
    return user
  }

  async loginFindMembership (user) {
    const stepMembership = this.LoggerService.AddStep('UserServerLoginMembershipFindBy')
    const membership = await this.MembershipRepository.findBy({ UserId: user.id })

    if (!membership.password) {
      const error = new ValidationError('Login falhou!', [{ code: 404, message: 'Senha Inválida' }])
      stepMembership.Finalize({ membership, error: { stack: error.stack, message: error.message } })
      throw error
    }
    stepMembership.Finalize(membership)
    return membership
  }

  loginComparePassword (password, membership, user) {
    const stepComparePassword = this.LoggerService.AddStep('UserServerLoginComparePassword')
    const passwordIsValid = comparePassword(password, membership.password)
    if (!passwordIsValid) {
      const error = new ValidationError('Login falhou!', [{ code: 404, message: 'Senha Inválida' }])
      stepComparePassword.Finalize({ passwordIsValid, error: { stack: error.stack, message: error.message } })
      throw error
    }
    this.LoggerService.SetUserId(membership.userId)
    stepComparePassword.Finalize({ passwordIsValid })
  }
}
