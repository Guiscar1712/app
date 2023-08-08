const { ValidationError } = require('../../utils/errors')
const { LoginValidate } = require('../../validators/user')
module.exports = class UserController {
  constructor ({ UserService, LoggerService }) {
    this.UserService = UserService
    this.LoggerService = LoggerService
  }

  login = async (request, response, next) => {
    const { email, password } = request.body
    this.LoggerService.NewLog({
      _indexs: {
        email,
        remoteAddress: request.connection.remoteAddress
      },
      request,
      endpoint: request.originalUrl,
      type: 'USER_LOGIN'
    })

    const stepLoginValidate = this.LoggerService.AddStep('LoginValidate')
    const stepUserControllerLogin = this.LoggerService.AddStep('UserControllerLogin')
    try {
      const contract = LoginValidate({ email, password })
      if (!contract.isValid()) {
        stepLoginValidate.Finalize({ message: 'Parâmetros inválidos', erros: contract.errors() })
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }
      stepLoginValidate.Finalize({ contract: contract.isValid() })

      const data = await this.UserService.login(email, password)
      stepUserControllerLogin.Finalize(data)

      next(data)
    } catch (error) {
      stepUserControllerLogin.Finalize(error)
      this.LoggerService.SetError(error)
      next(error)
    } finally {
      this.LoggerService.Finalize()
    }
  }
}
