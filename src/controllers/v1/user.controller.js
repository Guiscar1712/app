const { ValidationError } = require('../../utils/errors')
const { LoginValidate } = require('../../validators/user')
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
    const stepLoginValidate = this.LoggerService.addStep('LoginValidate')
    const stepUserControllerLogin = this.LoggerService.addStep('UserControllerLogin')

    try {
      const contract = LoginValidate({ email, password })
      if (!contract.isValid()) {
        stepLoginValidate.finalize({ message: 'Parâmetros inválidos', errors: contract.errors() })
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }
      stepLoginValidate.finalize({ contract: contract.isValid() })

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
}
