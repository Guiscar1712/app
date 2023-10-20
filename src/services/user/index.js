require('dotenv').config()
const jwt = require('jsonwebtoken')
const database = require('../../database/config.database')
const { ValidationError, RepositoryError } = require('../../utils/errors')
const config = require('../../utils/config')
const { comparePassword } = require('../../utils/auth')
const Util = require('../../utils/util')
const { getRecoverKey } = require('../../utils/auth')
const { DuplicateRegister } = require('../../validators/user')
const PersonalDataResponse = require('../../dto/personalData/personalDataResponse.Dto')
const personalDataUpdate = require('../../dto/personalData/personalDataUpdate.Dto')

module.exports = class UserService {
  constructor({
    UserRepository,
    MembershipRepository,
    UserFirebaseRepository,
    LoggerService,
    FirebaseClient,
    SendGridClient,
    IngressoClient,
  }) {
    this.UserRepository = UserRepository
    this.MembershipRepository = MembershipRepository
    this.LoggerService = LoggerService
    this.FirebaseClient = FirebaseClient
    this.UserFirebaseRepository = UserFirebaseRepository
    this.SendGridClient = SendGridClient
    this.IngressoClient = IngressoClient
  }

  login = async (email, password) => {
    const user = await this.loginFindUser(email)

    const membership = await this.loginFindMembership(user)

    this.loginComparePassword(password, membership, user)

    return { token: jwt.sign(user, config.jwtSecret) }
  }

  async loginFindUser(email) {
    const stepUser = this.LoggerService.addStep('UserServerLoginUserFindBy')
    const user = await this.UserRepository.findBy({ Email: email })
    if (!user) {
      const error = new ValidationError('Login falhou!', [
        {
          code: 404,
          message:
            'O email que você inseriu não está cadastrado no nosso APP. Crie uma nova conta do zero, e comece a aproveitar!',
        },
      ])
      stepUser.finalize({ user, error })
      throw error
    }
    stepUser.finalize(user)
    return user
  }

  async loginFindMembership(user) {
    const stepMembership = this.LoggerService.addStep(
      'UserServerLoginMembershipFindBy'
    )
    const membership = await this.MembershipRepository.findBy({
      UserId: user.id,
    })

    if (!membership.password) {
      const error = new ValidationError('Login falhou!', [
        { code: 404, message: 'Senha Inválida' },
      ])
      stepMembership.finalize({ membership, error })
      throw error
    }
    stepMembership.finalize(membership)
    return membership
  }

  loginComparePassword(password, membership, user) {
    const stepComparePassword = this.LoggerService.addStep(
      'UserServerLoginComparePassword'
    )
    const passwordIsValid = comparePassword(password, membership.password)
    if (!passwordIsValid) {
      const error = new ValidationError('Login falhou!', [
        { code: 404, message: 'Senha Inválida' },
      ])
      stepComparePassword.finalize({ passwordIsValid, error })
      throw error
    }
    this.LoggerService.setUserId(membership.userId)
    stepComparePassword.finalize({ passwordIsValid })
  }

  loginFirebase = async (token) => {
    const decoded = await this.FirebaseClient.authVerifyIdToken(token)

    let user = await this.UserRepository.findBy({ Email: decoded.email })

    if (!user) {
      const name = decoded.name || ''
      user = await this.createdUser({ name, email: decoded.email })
    }

    await this.createdUserFirebase(decoded, user)

    const fullProfile = isFullProfile(user)

    const data = { token: jwt.sign(user, config.jwtSecret), fullProfile }
    return data
  }

  async createdUserFirebase(decoded, user) {
    const stepCreatedUserFirebase = this.LoggerService.addStep(
      'UserServerCreatedUserFirebase'
    )
    try {
      let userFirebase = await this.UserFirebaseRepository.findByUid(
        decoded.uid
      )

      if (!userFirebase) {
        userFirebase = await this.UserFirebaseRepository.insert({
          UserId: user.id,
          Uid: decoded.uid,
          SignInProvider: decoded.firebase?.sign_in_provider,
        })
      }

      stepCreatedUserFirebase.finalize(userFirebase)
    } catch (error) {
      const dataError = new RepositoryError('Error Insert UserFirebase', error)
      stepCreatedUserFirebase.finalize(dataError)
      throw dataError
    }
  }

  async createdUser(entity) {
    const stepCreatedUser = this.LoggerService.addStep('UserServerCreatedUser')
    const transaction = await database.transaction()
    try {
      entity = prepare(entity)

      const model = getModel(entity)

      const user = await this.UserRepository.insert(model, transaction)

      const membership = await this.MembershipRepository.insert(
        {
          UserId: user.id,
        },
        transaction
      )

      await transaction.commit()

      this.LoggerService.setIndex({ userId: user.id, newUser: true })
      stepCreatedUser.finalize({
        model,
        insertedUser: !!user,
        insertedMembership: !!membership,
      })
      return user
    } catch (error) {
      await transaction.rollback()
      const dataError = new RepositoryError('Error Insert Membership', error)
      stepCreatedUser.finalize(dataError)
      throw dataError
    }
  }

  register = async (entity) => {
    await this.validateDataEntity(entity)

    const user = await this.createdUser(entity)

    await this.sendVerificationCode(user.id, user.name, user.email)

    return user
  }

  async validateDataEntity(entity, userId) {
    const stepValidateDataEntity = this.LoggerService.addStep(
      'UserServerValidateDataEntity'
    )
    try {
      entity.cpf = Util.getNumbers(entity.cpf)
      entity.phone = Util.getNumbers(entity.phone)

      const search = await this.UserRepository.findByCpfOrEmailOrPhone(
        { CPF: entity.cpf },
        { Email: entity.email },
        { Phone: entity.phone }
      )

      const user = {}
      user.cpf = search.find((f) => f.cpf === entity.cpf)?.cpf
      user.email = search.find((f) => f.email === entity.email)?.email
      user.phone = search.find((f) => f.phone === entity.phone)?.phone

      const contract = DuplicateRegister(user)

      if (!contract.isValid()) {
        throw new ValidationError('Dados já cadastrados', contract.errors())
      }

      stepValidateDataEntity.finalize({
        entity,
        userId,
        isValid: contract.isValid(),
      })
    } catch (error) {
      stepValidateDataEntity.finalize(error)
      throw error
    }
  }

  async getRecoveryKey(userId) {
    const stepGetRecoveryKey = this.LoggerService.addStep(
      'UserServerGetRecoveryKey'
    )
    try {
      const recoveryKey = await getRecoverKey()

      const membership = await this.MembershipRepository.findBy({
        UserId: userId,
      })

      await this.MembershipRepository.update(membership.id, {
        RecoveryKey: recoveryKey,
      })
      stepGetRecoveryKey.finalize({ recoveryKey })
      return recoveryKey
    } catch (error) {
      stepGetRecoveryKey.finalize({ userId, error })
      throw error
    }
  }

  async sendVerificationCode(userId, name, email) {
    const stepSendVerificationCode = this.LoggerService.addStep(
      'SendVerificationCode'
    )

    try {
      const recoverKey = await this.getRecoveryKey(userId)

      const templateName = process.env.SENDGRID_TEMPLATE_VERIFICATIONCODE
      const templateTitle = process.env.SENDGRID_TEMPLATE_VERIFICATIONCODE_TITLE

      const templateData = [
        {
          name: 'name_candidato',
          value: name,
        },
        {
          name: 'code_recovery',
          value: recoverKey,
        },
      ]

      const result = await this.SendGridClient.send(
        email,
        templateData,
        templateName,
        templateTitle
      )
      stepSendVerificationCode.finalize({
        email,
        templateName,
        templateTitle,
        sendEmailStatus: result[0]?.statusCode,
      })
      return result
    } catch (error) {
      stepSendVerificationCode.finalize({ userId, name, email, error })
      throw error
    }
  }

  personalDataGet = async (cpf) => {
    const step = this.LoggerService.addStepStepTrace(
      'UserServerPersonalDataGet'
    )
    try {
      const cpfFormat = Util.formatCpf(cpf)
      const personalData = await this.IngressoClient.personalDataGet(cpfFormat)
      const personalDataResponse = new PersonalDataResponse(personalData)
      this.LoggerService.finalizeStep(
        step.value,
        step.key,
        personalDataResponse
      )
      return personalDataResponse
    } catch (error) {
      throw error
    }
  }

  personalDataUpdate = async (data) => {
    const step = this.LoggerService.addStepStepTrace(
      'UserServerPersonalDataUpdate'
    )
    try {
      const model = new personalDataUpdate(data)
      console.log(JSON.stringify(model))
      const personalData = await this.IngressoClient.personalDataUpdate(model)
      this.LoggerService.finalizeStep(step.value, step.key, personalData)
      return personalData
    } catch (error) {
      throw error
    }
  }

  async findUserByCpf(cpf) {
    const stepUser = this.LoggerService.addStep('UserServerUserFindByCpf')
    const user = await this.UserRepository.findBy({ Cpf: cpf })
    if (!user) {
      const error = new ValidationError('Login falhou!', [
        { code: 404, message: 'Email não cadastrado!' },
      ])
      stepUser.finalize({ user, error })
      throw error
    }
    stepUser.finalize({ cpf, user })
    return user
  }
}

function isFullProfile(user) {
  return !!user.CPF && !!user.Phone && !!user.Gender && !!user.Birthday
}

function prepare(entity) {
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

function getModel(entity) {
  const keys = Object.keys(entity)

  const model = {}
  keys.forEach((key) => {
    if (entity[key]) {
      model[key] = entity[key]
    }
  })
  return model
}
