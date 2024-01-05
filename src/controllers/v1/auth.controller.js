const { CpfValidate } = require('../../validators/user')
const { requestValidate, loginValidate } = require('../../validators/auth')
const { ValidationError } = require('../../utils/errors')
const constants = require('../../constants/auth.constants')
const AuthRegisterRequest = require('../../dto/auth/authRegister.request')

module.exports = class UserController {
  constructor({ AuthService, LoggerService }) {
    this.AuthService = AuthService
    this.LoggerService = LoggerService
  }

  validate = async (request, response, next) => {
    let { document } = request.body
    this.LoggerService.setIndex({ document })
    const step = this.LoggerService.addStep('AuthControllerLogin')

    try {
      const contract = CpfValidate(document)
      if (!contract.isValid()) {
        throw new ValidationError(
          'Parâmetros inválidos',
          contract.errors(),
          constants.CODE
        )
      }

      const data = await this.AuthService.validator(document)

      response.code = 200
      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }

  request = async (request, response, next) => {
    let provider = request.params.provider
    let { receiver, userId } = request.body
    this.LoggerService.setIndex({ userId })
    const step = this.LoggerService.addStep('AuthControllerRequest')
    try {
      const contract = requestValidate({ receiver, userId })
      if (!contract.isValid()) {
        throw new ValidationError(
          'Parâmetros inválidos',
          contract.errors(),
          constants.CODE
        )
      }

      const data = await this.AuthService.request({
        provider,
        receiver,
        userId,
      })

      response.code = 200
      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }

  login = async (request, response, next) => {
    let { provider, userId, token } = request.body
    this.LoggerService.setIndex({ userId })
    const step = this.LoggerService.addStep('AuthControllerLogin')

    try {
      const contract = loginValidate({ provider, userId, token })
      if (!contract.isValid()) {
        throw new ValidationError(
          'Parâmetros inválidos',
          contract.errors(),
          constants.CODE
        )
      }

      const data = await this.AuthService.login({
        provider,
        userId,
        token,
      })

      response.code = 200
      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }

  register = async (request, response, next) => {
    
    this.LoggerService.setIndex({ email: request.body.email })
    const step = this.LoggerService.addStep('AuthControllerRegister')

    try {
      const authRegister = new AuthRegisterRequest(request.body)
      const data = await this.AuthService.register(authRegister)
      step.value.addData(data)
      this.LoggerService.setUserId(data.id)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }
}
