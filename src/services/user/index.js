require('dotenv').config()
const jwt = require('jsonwebtoken')
const database = require('../../database/config.database')
const {
  ValidationError,
  RepositoryError,
  ServerError,
} = require('../../utils/errors')
const config = require('../../utils/config')
const { comparePassword } = require('../../utils/auth')
const Util = require('../../utils/util')
const { getRecoverKey } = require('../../utils/auth')
const { DuplicateRegister } = require('../../validators/user')
const PersonalDataResponse = require('../../dto/personalData/personalDataResponse.Dto')
const personalDataUpdate = require('../../dto/personalData/personalDataUpdate.Dto')
const constants = require('../../constants/user.constants')

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
        const error = new ValidationError(
          'Login falhou!',
          [constants.NOT_REGISTER_EMAIL],
          constants.code
        )

        throw error
      }
      step.value.addData(user)
      return user
    } catch (error) {
      throw error
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
        const error = new ValidationError(
          'Login falhou!',
          [constants.INVALID_PASSWORD],
          constants.code
        )

        throw error
      }
      step.value.addData(membership)
      return membership
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  loginComparePassword(password, membership, user) {
    const step = this.LoggerService.addStep('UserServerLoginComparePassword')
    try {
      const passwordIsValid = comparePassword(password, membership.password)
      if (!passwordIsValid) {
        const error = new ValidationError(
          'Login falhou!',
          [constants.INVALID_PASSWORD],
          constants.code
        )

        throw error
      }
      this.LoggerService.setUserId(membership.userId)
      step.value.addData({ passwordIsValid })
    } catch (error) {
      throw error
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
      const dataError = new RepositoryError(
        'Error Insert UserFirebase',
        error,
        constants.code
      )
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
      const dataError = new RepositoryError(
        'Error Insert User',
        error,
        constants.code
      )
      step.value.addData(dataError)
      throw dataError
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  async updateUser(id, entity) {
    const step = this.LoggerService.addStep('UserServerUpdateUser')
    const transaction = await database.transaction()
    try {
      entity = prepare(entity)

      const model = getModel(entity)

      const user = await this.UserRepository.update(id, model, transaction)

      await transaction.commit()

      this.LoggerService.setIndex({ userId: user.id, newUser: false })
      step.value.addData({
        model,
        updatedUser: !!user,
      })
      return user
    } catch (error) {
      await transaction.rollback()
      step.value.addData(dataError)
      throw dataError
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  register = async (entity) => {
    const userSearch = await this.validateDataEntity(entity)

    let user
    if (!userSearch) {
      user = await this.createdUser(entity)
    } else {
      user = await this.updateUser(userSearch.id, entity)
    }

    if (!user) {
      throw ServerError(
        'Something went wrong',
        {
          data: entity,
        },
        constants.code
      )
    }
    await this.sendVerificationCode(user.id, user.name, user.email)

    return user
  }

  async validateDataEntity(entity, userId) {
    const step = this.LoggerService.addStep('UserServerValidateDataEntity')
    try {
      entity.cpf = Util.getNumbers(entity.cpf)
      entity.phone = Util.getNumbers(entity.phone)
      entity.email = entity.email.toLowerCase().trim()

      const search = await this.UserRepository.findByCpfOrEmailOrPhone(
        entity.cpf,
        entity.email,
        entity.phone
      )

      const userSearchEmail = search.find((f) => f.email === entity.email)

      const userSearch = search.find((f) => f.cpf === null && f.phone === null)

      const membership = userSearchEmail
        ? await this.MembershipRepository.findBy({
            UserId: userSearchEmail.id,
            Password: null,
          })
        : null

      const userSearchIsValid = userSearch || membership

      if (
        (!userSearchIsValid && search.length >= 1) ||
        !(userSearchIsValid && search.length === 1)
      ) {
        const user = {}
        user.cpf = search.find((f) => f.cpf === entity.cpf)?.cpf
        user.email = search.find((f) => f.email === entity.email)?.email
        user.phone = search.find((f) => f.phone === entity.phone)?.phone

        const contract = DuplicateRegister(user)

        if (!contract.isValid()) {
          const errors = contract.errors()

          throw new ValidationError(
            'Dados já cadastrados',
            contract.errors(),
            constants.code
          )
        }
      }

      step.value.addData({
        entity,
        userId,
        isValid: true,
      })

      return userSearchEmail
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
      // const cpfFormat = Util.formatCpf(cpf)
      // const personalData = await this.IngressoClient.personalDataGet(cpfFormat)
      // const personalDataResponse = new PersonalDataResponse(personalData)

       const personalDataResponse = mockUser()
      step.value.addData(personalDataResponse)
      return personalDataResponse
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  personalDataUpdate = async (data) => {
    const step = this.LoggerService.addStep('UserServerPersonalDataUpdate')
    try {
      const model = new personalDataUpdate(data)
      const personalData = await this.IngressoClient.personalDataUpdate(model)
      step.value.addData(personalData)
      return personalData
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  findUserByCpf = async (cpf) => {
    const step = this.LoggerService.addStep('UserServerUserFindByCpf')
    try {
      const user = await this.UserRepository.findBy({ Cpf: cpf })
      if (!user) {
        const error = new ValidationError(
          'Login falhou!',
          [constants.NOT_REGISTER_CPF],
          constants.code
        )
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
    if (entity[key] || key === 'name') {
      model[key] = entity[key]
    }
  })
  return model
}


function mockUser() { return new PersonalDataResponse({
	"cpf": "141.338.669-59",
	"nome": "HEITOR F NETO",
	"sexo": "NI",
	"rg": "1234567899",
	"dataNascimento": "1990-06-28",
	"emails": [
		{
			"email": "heitor.fernandes@bluecore.it",
			"principal": true
		}
	],
	"telefones": [
		{
			"tipo": "MOVEL",
			"numero": "(11) 92345-6789",
			"principal": true
		},
		{
			"tipo": "FIXO",
			"numero": "(11) 9234-5678",
			"principal": false
		}
	],
	"enderecos": [
		{
			"tipo": "PRINCIPAL",
			"logradouro": "TESTE TESTE",
			"numero": "123",
			"bairro": "-",
			"cep": "48970-000",
			"municipio": "SENHOR DO BONFIM",
			"uf": "BA"
		}
	],
	"necessidadesEspeciais": [],
	"canalComunicacao": {
		"email": false,
		"sms": false,
		"whatsApp": false
	},
	"documentosValidados": false
})}