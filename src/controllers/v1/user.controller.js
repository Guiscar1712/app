const { utc } = require('moment-timezone')
const { ValidationError } = require('../../utils/errors')
const { LoginValidate, ApplyValidate, CpfValidate } = require('../../validators/user')
const Util = require('../../utils/util')
module.exports = class UserController {
  constructor ({ UserService, LoggerService }) {
    this.UserService = UserService
    this.LoggerService = LoggerService
  }

  login = async (request, response, next) => {
    const { email, password } = request.body
    this.LoggerService.setIndex({ email })
    const stepUserControllerLogin = this.LoggerService.addStep('UserControllerLogin')

    try {
      this.validateLogin(email, password)

      const data = await this.UserService.login(email, password)
      stepUserControllerLogin.finalize(data)

      next(data)
    } catch (error) {
      stepUserControllerLogin.finalize(error)
      next(error)
    }
  }

  loginFirebase = async (request, response, next) => {
    const { token } = request.body
    const stepUserControllerLogin = this.LoggerService.addStep('UserControllerLogin')

    try {
      this.validateLoginFirebase(token)

      const data = await this.UserService.loginFirebase(token)
      stepUserControllerLogin.finalize(data)
      next(data)
    } catch (error) {
      stepUserControllerLogin.finalize(error)
      next(error)
    }
  }

  register = async (request, response, next) => {
    const body = request.body
    this.LoggerService.setIndex({ email: body.email })
    const stepUserControllerLogin = this.LoggerService.addStep('UserControllerRegister')

    try {
      this.validateRegister(body)

      const data = await this.UserService.register(body)
      stepUserControllerLogin.finalize(data)

      next(data)
    } catch (error) {
      stepUserControllerLogin.finalize(error)
      next(error)
    }
  }

  getPersonalData = async (request, response, next) => {
    const cpf = request.params.cpf
    this.LoggerService.setIndex({ cpf })
    const step = this.LoggerService.addStep('UserControllerGetPersonalData')

    try {
      this.validateGetPersonalData(request.user, cpf)

      const data = await this.UserService.getPersonalData(cpf)
      step.finalize(data)

      next(data)
    } catch (error) {
      step.finalize(error)
      next(error)
    }
  }

  validateRegister (body) {
    const stepRegisterValidate = this.LoggerService.addStep('RegisterValidate')
    const contract = ApplyValidate(body)
    if (!contract.isValid()) {
      stepRegisterValidate.finalize({ message: 'Parâmetros inválidos', errors: contract.errors() })
      throw new ValidationError('Parâmetros inválidos', contract.errors())
    }

    stepRegisterValidate.finalize({ isValid: contract.isValid() })
  }

  validateLogin (email, password) {
    const stepLoginValidate = this.LoggerService.addStep('LoginValidate')
    const contract = LoginValidate({ email, password })
    if (!contract.isValid()) {
      stepLoginValidate.finalize({ message: 'Parâmetros inválidos', errors: contract.errors() })
      throw new ValidationError('Parâmetros inválidos', contract.errors())
    }
    stepLoginValidate.finalize({ isValid: contract.isValid() })
  }

  validateLoginFirebase (token) {
    const stepLoginValidate = this.LoggerService.addStep('LoginValidate')
    if (!token) {
      const errors = [{ message: 'token é obrigatorio' }]
      stepLoginValidate.finalize({ message: 'Parâmetros inválidos', errors })
      throw new ValidationError('Parâmetros inválidos', errors)
    }
    stepLoginValidate.finalize({ isValid: true })
  }

  validateGetPersonalData (user, cpf) {
    const stepLoginValidate = this.LoggerService.addStep('PersonalDataValidate')
    const contract = CpfValidate({ cpf })
    if (!contract.isValid()) {
      stepLoginValidate.finalize({ message: 'Parâmetros inválidos', errors: contract.errors() })
      throw new ValidationError('Parâmetros inválidos', contract.errors())
    }
    const cpfClean = Util.getNumbers(cpf)

    if (user.cpf !== cpfClean) {
      const error = [{ code: 4010, message: 'CPF não pertence ao usuário autenticado' }]
      stepLoginValidate.finalize({ message: 'Parâmetros inválidos', errors: [{ code: 4010, message: error }] })
      throw new ValidationError('Parâmetros inválidos', error)
    }

    stepLoginValidate.finalize({ isValid: contract.isValid() })
  }
}
