const { CpfValidate } = require('../../validators/user')
const { requestValidate, loginValidate } = require('../../validators/auth')
const { ValidationError } = require('../../utils/errors')
const constants = require('../../constants/auth.constants')

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
          constants.code
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
        throw new ValidationError('Parâmetros inválidos', contract.errors())
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
    let { provider, userId, key } = request.body
    this.LoggerService.setIndex({ userId })
    const step = this.LoggerService.addStep('AuthControllerLogin')

    try {
      const contract = loginValidate({ provider, userId, key })
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await this.AuthService.login({ provider, userId, key })

      response.code = 200
      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }
}
