const { ValidationError } = require('../../utils/errors')
const constants = require('../../constants/user.constants')

const {
  LoginValidate,
  ApplyValidate,
  CpfValidate,
  UpdatePersonalDataValidate,
} = require('../../validators/user')
const Util = require('../../utils/util')
module.exports = class UserController {
  constructor({ UserService, LoggerService }) {
    this.UserService = UserService
    this.LoggerService = LoggerService
  }

  login = async (request, response, next) => {
    let { email, password } = request.body
    this.LoggerService.setIndex({ email })
    const step = this.LoggerService.addStep('UserControllerLogin')

    try {
      email = email?.trim()
      this.validateLogin(email, password)
      const data = await this.UserService.login(email, password)

      step.value.addData(data)
      this.LoggerService.finalizeStep(step)

      next(data)
    } catch (error) {
      next(error)
    }
  }

  loginFirebase = async (request, response, next) => {
    const { token } = request.body
    const step = this.LoggerService.addStep('UserControllerLogin')

    try {
      this.validateLoginFirebase(token)
      const data = await this.UserService.loginFirebase(token)

      step.value.addData(data)
      this.LoggerService.finalizeStep(step)

      next(data)
    } catch (error) {
      next(error)
    }
  }

  register = async (request, response, next) => {
    const body = request.body
    this.LoggerService.setIndex({ email: body.email })
    const step = this.LoggerService.addStep('UserControllerRegister')

    try {
      this.validateRegister(body)
      const data = await this.UserService.register(body)

      step.value.addData(data)
      this.LoggerService.finalizeStep(step)

      next(data)
    } catch (error) {
      next(error)
    }
  }

  personalDataGet = async (request, response, next) => {
    const step = this.LoggerService.addStep('UserControllerPersonalDataGet')
    const cpf = request.params.cpf
    this.LoggerService.setIndex({ cpf })
    try {
      this.validateGetPersonalData(request.user, cpf)
      const data = await this.UserService.personalDataGet(cpf)

      step.value.addData(data)
      this.LoggerService.finalizeStep(step)

      next(data)
    } catch (error) {
      next(error)
    }
  }

  personalDataUpdate = async (request, response, next) => {
    const step = this.LoggerService.addStep('UserControllerPersonalDataUpdate')
    const body = request.body
    try {
      this.validateUpdatePersonalData(request.user, body)
      const data = await this.UserService.personalDataUpdate(body)

      step.value.addData(data)
      this.LoggerService.finalizeStep(step)

      next(data)
    } catch (error) {
      next(error)
    }
  }

  validateRegister(body) {
    const step = this.LoggerService.addStep('RegisterValidate')
    const contract = ApplyValidate(body)

    step.value.addData({ isValid: contract.isValid() })
    this.LoggerService.finalizeStep(step)

    if (!contract.isValid()) {    
      throw new ValidationError(
        'Parâmetros inválidos',
        contract.errors(),
        constants.code
      )
    }
  }

  validateLogin(email, password) {
    const step = this.LoggerService.addStep('LoginValidate')
    const contract = LoginValidate({ email, password })

    step.value.addData({ isValid: contract.isValid() })
    this.LoggerService.finalizeStep(step)

    if (!contract.isValid()) {      
      throw new ValidationError(
        'Parâmetros inválidos',
        contract.errors(),
        constants.code
      )
    }
  }

  validateLoginFirebase(token) {
    const step = this.LoggerService.addStep('LoginValidate')

    step.value.addData({ tokenIsValid: !!token })
    this.LoggerService.finalizeStep(step)

    if (!token) {
      const errors = [constants.REQUIRED_TOKEN_FIREBASE]
      throw new ValidationError('Parâmetros inválidos', errors)
    }
  }

  validateGetPersonalData(user, cpf) {
    const step = this.LoggerService.addStep('PersonalDataValidate')

    try {
      const contract = CpfValidate({ cpf })

      step.value.addData({ cpfIsValid: contract.isValid() })

      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }
      const cpfClean = Util.getNumbers(cpf)

      step.value.addData({ ...step.data, cpfFromUser: user.cpf === cpfClean })

      if (user.cpf !== cpfClean) {
        const error = [
          { code: 4010, message: 'CPF não pertence ao usuário autenticado' },
        ]

        throw new ValidationError('Parâmetros inválidos', error)
      }
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  validateUpdatePersonalData(user, model) {
    const step = this.LoggerService.addStep('PersonalDataValidate')
    try {
      const cpfClean = Util.getNumbers(model.documentCpf)

      step.value.addData({ cpfFromUser: user.cpf === cpfClean })

      if (user.cpf !== cpfClean) {
        const error = [
          { code: 4010, message: 'CPF não pertence ao usuário autenticado' },
        ]

        throw new ValidationError('Parâmetros inválidos', error)
      }

      const contract = UpdatePersonalDataValidate(model)

      step.value.addData({
        cpfFromUser: user.cpf === cpfClean,
        isIsValid: contract.isValid(),
      })

      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
