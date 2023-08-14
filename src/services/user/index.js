require('dotenv').config()
const jwt = require('jsonwebtoken')
const database = require('../../database/config.database')
const { ValidationError, RepositoryError } = require('../../utils/errors')
const config = require('../../utils/config')
const { comparePassword } = require('../../utils/auth')
const Util = require('../../utils/util')
module.exports = class UserService {
  constructor ({ UserRepository, MembershipRepository, UserFirebaseRepository, LoggerService, FirebaseClient }) {
    this.UserRepository = UserRepository
    this.MembershipRepository = MembershipRepository
    this.LoggerService = LoggerService
    this.FirebaseClient = FirebaseClient
    this.UserFirebaseRepository = UserFirebaseRepository
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

  loginFirebase = async (token) => {
    const decoded = await this.FirebaseClient.authVerifyIdToken(token)

    let user = await this.UserRepository.findBy({ Email: decoded.email })

    const newUser = !user
    if (!user) {
      const name = decoded.name || ''
      user = await this.createdUser({ name, email: decoded.email })
    }

    this.LoggerService.setIndex({ userId: user.id, newUser })

    await this.createdUserFirebase(decoded, user)

    const fullProfile = isFullProfile(user)

    const data = { token: jwt.sign(user, config.jwtSecret), fullProfile }
    return data
  }

  async createdUserFirebase (decoded, user) {
    const stepCreatedUserFirebase = this.LoggerService.addStep('createdUserFirebase')
    try {
      let userFirebase = await this.UserFirebaseRepository.findByUid(decoded.uid)

      if (!userFirebase) {
        userFirebase = await this.UserFirebaseRepository.insert({
          UserId: user.id,
          Uid: decoded.uid,
          SignInProvider: decoded.firebase?.sign_in_provider
        })
      }

      stepCreatedUserFirebase.finalize(userFirebase)
    } catch (error) {
      const dataError = new RepositoryError('Error Insert UserFirebase', error)
      stepCreatedUserFirebase.finalize(dataError)
      throw dataError
    }
  }

  async createdUser (entity) {
    const stepCreatedUser = this.LoggerService.addStep('createdUser')
    const transaction = await database.transaction()
    try {
      entity = prepare(entity)

      const model = getModel(entity)

      const user = await this.UserRepository.insert(
        model,
        transaction
      )

      if (!user) {
        throw new Error(user)
      }

      await this.MembershipRepository.insert(
        {
          UserId: user.id
        },
        transaction
      )

      await transaction.commit()

      stepCreatedUser.finalize(user)
      return user
    } catch (error) {
      await transaction.rollback()
      const dataError = new RepositoryError('Error Insert Membership', error)
      stepCreatedUser.finalize(dataError)
      throw dataError
    }
  }
}

function isFullProfile (user) {
  return !!user.CPF && !!user.Phone && !!user.Gender && !!user.Birthday
}

function prepare (entity) {
  if (entity.cpf) {
    entity.cpf = Util.getNumbers(entity.cpf)
  }
  if (entity.phone) {
    entity.phone = Util.getNumbers(entity.phone)
  }
  if (entity.gender) {
    entity.gender = entity.gender.toUpperCase()
  }
  return entity
}

function getModel (entity) {
  const keys = Object.keys(entity)

  const model = {}
  keys.forEach(key => {
    if (entity[key]) {
      model[key] = entity[key]
    }
  })
  return model
}
