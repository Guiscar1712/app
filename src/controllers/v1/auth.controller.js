const {
    CpfValidate
} = require('../../validators/user')

const {
    requestValidate
} = require('../../validators/auth')


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
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }            
     
      const data = await this.AuthService.validator(document)

      next(data)
    } catch (error) {
      next(error)
    }
  }

  request = async (request, response, next) => {
    let { receiver, userId } = request.body
    this.LoggerService.setIndex({ userId })
    const step = this.LoggerService.addStep('RequestControllerLogin')

    try {
      
      const contract = requestValidate({ receiver, userId })
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }            
     
      const data = await this.AuthService.request({ receiver, userId })

      next(data)
    } catch (error) {
      next(error)
    }
  }
}
