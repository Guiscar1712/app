const { ValidationError } = require('../../utils/errors')
const { LoginValidate } = require('../../validators/user')
module.exports = class UserController {
  constructor ({ UserService, LoggerService }) {
    this.UserService = UserService
    this.LoggerService = LoggerService
  }

  login = async (request, response, next) => {
    const { email, password } = request.body
    this.LoggerService.Start({
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
        stepLoginValidate.finalize({ message: 'Parâmetros inválidos', erros: contract.errors() })
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }
      stepLoginValidate.finalize({ contract: contract.isValid() })

      const data = await this.UserService.login(email, password)
      stepUserControllerLogin.finalize(data)
      const res = response.json(data)
      this.LoggerService.SetResponse({
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        send: data
      })
      return res
    } catch (error) {
      stepUserControllerLogin.finalize({ error })
      this.LoggerService.SetError()
      next(error)
    } finally {
      this.LoggerService.finalize()
    }
  }
}
