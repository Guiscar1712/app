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
    const stepUser = this.LoggerService.addStep('UserServerLoginUserFindBy')
    const user = await this.UserRepository.findBy({ Email: email })
    if (!user) {
      const error = new ValidationError('Login falhou!', [{ code: 404, message: 'Email não cadastrado!' }])
      stepUser.finalize({ user, error })
      throw error
    }
    stepUser.finalize(user)
    return user
  }

  async loginFindMembership (user) {
    const stepMembership = this.LoggerService.addStep('UserServerLoginMembershipFindBy')
    const membership = await this.MembershipRepository.findBy({ UserId: user.id })

    if (!membership.password) {
      const error = new ValidationError('Login falhou!', [{ code: 404, message: 'Senha Inválida' }])
      stepMembership.finalize({ membership, error })
      throw error
    }
    stepMembership.finalize(membership)
    return membership
  }

  loginComparePassword (password, membership, user) {
    const stepComparePassword = this.LoggerService.addStep('UserServerLoginComparePassword')
    const passwordIsValid = comparePassword(password, membership.password)
    if (!passwordIsValid) {
      const error = new ValidationError('Login falhou!', [{ code: 404, message: 'Senha Inválida' }])
      stepComparePassword.finalize({ passwordIsValid, error })
      throw error
    }
    this.LoggerService.setUserId(membership.userId)
    stepComparePassword.finalize({ passwordIsValid })
  }
}
