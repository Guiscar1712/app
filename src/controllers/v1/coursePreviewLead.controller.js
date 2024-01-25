const {
  validate,
  validateCoursePreviewLeadId,
} = require('../../validators/coursePreview')
const { ValidationError } = require('../../utils/errors')
const constants = require('../../constants/auth.constants')
const AuthRegisterRequest = require('../../dto/auth/authRegister.request')

module.exports = class CoursePreviewController {
  constructor({ CoursePreviewLeadService, LoggerService }) {
    this.CoursePreviewLeadService = CoursePreviewLeadService
    this.LoggerService = LoggerService
  }

  start = async (request, response, next) => {
    const step = this.LoggerService.addStep('CoursePreviewControllerStart')

    try {
      const user = request.user || request.body
      this.LoggerService.setIndex(user)
      const { identifier } = request.body
      const contract = validate(user)
      if (!contract.isValid()) {
        throw new ValidationError(
          'Parâmetros inválidos',
          contract.errors(),
          constants.CODE
        )
      }

      const data = await this.CoursePreviewLeadService.start({
        ...user,
        identifier,
      })

      response.code = 200
      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }

  finish = async (request, response, next) => {
    let { coursePreviewLeadId } = request.body
    this.LoggerService.setIndex({ coursePreviewLeadId })
    const step = this.LoggerService.addStep('CoursePreviewControllerFinish')
    try {
      const contract = validateCoursePreviewLeadId({ coursePreviewLeadId })
      if (!contract.isValid()) {
        throw new ValidationError(
          'Parâmetros inválidos',
          contract.errors(),
          constants.CODE
        )
      }

      const data =
        await this.CoursePreviewLeadService.finish(coursePreviewLeadId)

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
