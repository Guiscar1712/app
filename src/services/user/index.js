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
    const step = this.LoggerService.addStep('UserServerLoginUserFindBy')
    try {
      const user = await this.UserRepository.findBy({ Email: email })
      if (!user) {
        const error = new ValidationError('Login falhou!', [
          {
            code: 404,
            message:
              'O email que você inseriu não está cadastrado no nosso APP. Crie uma nova conta do zero, e comece a aproveitar!',
          },
        ])

        throw error
      }
      step.value.addData(user)
      return user
    } catch (error) {
      step.value.addData({ email, error })
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async loginFindMembership(user) {
    const step = this.LoggerService.addStep('UserServerLoginMembershipFindBy')
    try {
      const membership = await this.MembershipRepository.findBy({
        UserId: user.id,
      })

      if (!membership.password) {
        const error = new ValidationError('Login falhou!', [
          { code: 404, message: 'Senha Inválida' },
        ])

        throw error
      }
      step.value.addData(membership)
      return membership
    } catch (error) {
      step.value.addData({ user, error })
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  loginComparePassword(password, membership, user) {
    const step = this.LoggerService.addStep('UserServerLoginComparePassword')
    try {
      const passwordIsValid = comparePassword(password, membership.password)
      if (!passwordIsValid) {
        const error = new ValidationError('Login falhou!', [
          { code: 404, message: 'Senha Inválida' },
        ])

        throw error
      }
      this.LoggerService.setUserId(membership.userId)
      step.value.addData({ passwordIsValid })
    } catch (error) {
      step.data.finalize({ membership, user, error })
    } finally {
      this.LoggerService.finalizeStep(step)
    }
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
    const step = this.LoggerService.addStep('UserServerCreatedUserFirebase')
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

      step.value.addData(userFirebase)
    } catch (error) {
      const dataError = new RepositoryError('Error Insert UserFirebase', error)
      step.value.addData(dataError)
      throw dataError
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async createdUser(entity) {
    const step = this.LoggerService.addStep('UserServerCreatedUser')
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
      step.value.addData({
        model,
        insertedUser: !!user,
        insertedMembership: !!membership,
      })
      return user
    } catch (error) {
      await transaction.rollback()
      const dataError = new RepositoryError('Error Insert Membership', error)
      step.value.addData(dataError)
      throw dataError
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  register = async (entity) => {
    await this.validateDataEntity(entity)

    const user = await this.createdUser(entity)

    await this.sendVerificationCode(user.id, user.name, user.email)

    return user
  }

  async validateDataEntity(entity, userId) {
    const step = this.LoggerService.addStep('UserServerValidateDataEntity')
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

      step.value.addData({
        entity,
        userId,
        isValid: contract.isValid(),
      })
    } catch (error) {
      step.value.addData(error)
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async getRecoveryKey(userId) {
    const step = this.LoggerService.addStep('UserServerGetRecoveryKey')
    try {
      const recoveryKey = await getRecoverKey()

      const membership = await this.MembershipRepository.findBy({
        UserId: userId,
      })

      await this.MembershipRepository.update(membership.id, {
        RecoveryKey: recoveryKey,
      })
      step.value.addData({ recoveryKey })
      return recoveryKey
    } catch (error) {
      step.value.addData({ userId, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async sendVerificationCode(userId, name, email) {
    const step = this.LoggerService.addStep('SendVerificationCode')

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
      step.value.addData({
        email,
        templateName,
        templateTitle,
        sendEmailStatus: result[0]?.statusCode,
      })
      return result
    } catch (error) {
      step.value.addData({ userId, name, email, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  personalDataGet = async (cpf) => {
    const step = this.LoggerService.addStep('UserServerPersonalDataGet')
    try {
      const cpfFormat = Util.formatCpf(cpf)
      const personalData = await this.IngressoClient.personalDataGet(cpfFormat)
      const personalDataResponse = new PersonalDataResponse(personalData)
      step.value.addData(personalDataResponse)
      return personalDataResponse
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  personalDataUpdate = async (model) => {
    const step = this.LoggerService.addStep('UserServerPersonalDataUpdate')
    try {
      const model = new personalDataUpdate(model)
      const personalData = await this.IngressoClient.personalDataUpdate(model)
      step.value.addData(personalData)
      return personalDataResponse
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async findUserByCpf(cpf) {
    const step = this.LoggerService.addStep('UserServerUserFindByCpf')
    try {
      const user = await this.UserRepository.findBy({ Cpf: cpf })
      if (!user) {
        const error = new ValidationError('Login falhou!', [
          { code: 404, message: 'Email não cadastrado!' },
        ])
        step.value.addData({ user, error })
        throw error
      }
      step.value.addData({ cpf, user })
      return user
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
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
