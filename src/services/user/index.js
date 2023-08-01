require('dotenv').config()
const jwt = require('jsonwebtoken')
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
      const error = new Error('email não cadastrado!')
      stepUser.finalize({ user, error: { stack: error.stack, message: error.message } })
      throw error
    }
    stepUser.finalize(user)
    return user
  }

  async loginFindMembership (user) {
    const stepMembership = this.LoggerService.AddStep('UserServerLoginMembershipFindBy')
    const membership = await this.MembershipRepository.findBy({ UserId: user.id })

    if (!membership.password) {
      const error = new Error('senha inválida!')
      stepMembership.finalize({ membership, error: { stack: error.stack, message: error.message } })
      throw error
    }
    stepMembership.finalize(membership)
    return membership
  }

  loginComparePassword (password, membership, user) {
    const stepComparePassword = this.LoggerService.AddStep('UserServerLoginstepComparePassword')
    const passwordIsValid = comparePassword(password, membership.password)
    if (!passwordIsValid) {
      const error = new Error('senha inválida!')
      stepComparePassword.finalize({ passwordIsValid, error: { stack: error.stack, message: error.message } })
      throw error
    }
    stepComparePassword.finalize({ passwordIsValid })
  }
}
