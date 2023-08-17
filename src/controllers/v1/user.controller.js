const { ValidationError } = require('../../utils/errors')
const { LoginValidate, ApplyValidate } = require('../../validators/user')
module.exports = class UserController {
  constructor ({ UserService, LoggerService }) {
    this.UserService = UserService
    this.LoggerService = LoggerService
  }

  login = async (request, response, next) => {
    const { email, password } = request.body
    const indexLog = {
      email,
      remoteAddress: request.connection.remoteAddress
    }
    this.LoggerService.newLog(indexLog, 'USER_LOGIN', request)

    const stepUserControllerLogin = this.LoggerService.addStep('UserControllerLogin')

    try {
      this.validateLogin(email, password)

      const data = await this.UserService.login(email, password)
      stepUserControllerLogin.finalize(data)

      next(data)
    } catch (error) {
      stepUserControllerLogin.finalize(error)
      this.LoggerService.setError(error)
      next(error)
    } finally {
      this.LoggerService.finalize()
    }
  }

  loginFirebase = async (request, response, next) => {
    const { token } = request.body
    const indexLog = {
      remoteAddress: request.connection.remoteAddress
    }
    this.LoggerService.newLog(indexLog, 'USER_LOGIN_FIREBASE', request)
    const stepUserControllerLogin = this.LoggerService.addStep('UserControllerLogin')

    try {
      this.validateLoginFirebase(token)

      const data = await this.UserService.loginFirebase(token)
      stepUserControllerLogin.finalize(data)
      next(data)
    } catch (error) {
      stepUserControllerLogin.finalize(error)
      this.LoggerService.setError(error)
      next(error)
    } finally {
      this.LoggerService.finalize()
    }
  }

  register = async (request, response, next) => {
    const body = request.body
    const indexLog = {
      email: body.email,
      remoteAddress: request.connection.remoteAddress
    }

    this.LoggerService.newLog(indexLog, 'USER_REGISTER', request)

    const stepUserControllerLogin = this.LoggerService.addStep('UserControllerRegister')

    try {
      this.validateRegister(body)

      const data = await this.UserService.register(body)
      stepUserControllerLogin.finalize(data)

      next(data)
    } catch (error) {
      stepUserControllerLogin.finalize(error)
      this.LoggerService.setError(error)
      next(error)
    } finally {
      this.LoggerService.finalize()
    }
  }

  validateRegister (body) {
    const stepRegisterValidate = this.LoggerService.addStep('RegisterValidate')
    const contract = ApplyValidate(body)
    if (!contract.isValid()) {
      stepRegisterValidate.finalize({ message: 'Parâmetros inválidos', errors: contract.errors() })
      throw new ValidationError('Parâmetros inválidos', contract.errors())
    }

    stepRegisterValidate.finalize({ contract: contract.isValid() })
  }

  validateLogin (email, password) {
    const stepLoginValidate = this.LoggerService.addStep('LoginValidate')
    const contract = LoginValidate({ email, password })
    if (!contract.isValid()) {
      stepLoginValidate.finalize({ message: 'Parâmetros inválidos', errors: contract.errors() })
      throw new ValidationError('Parâmetros inválidos', contract.errors())
    }
    stepLoginValidate.finalize({ contract: contract.isValid() })
  }

  validateLoginFirebase (token) {
    const stepLoginValidate = this.LoggerService.addStep('LoginValidate')
    if (!token) {
      const errors = [{ message: 'token é obrigatorio' }]
      stepLoginValidate.finalize({ message: 'Parâmetros inválidos', errors })
      throw new ValidationError('Parâmetros inválidos', errors)
    }
    stepLoginValidate.finalize({ contract: true })
  }
}
