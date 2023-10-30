const { ValidationError } = require('../../utils/errors')

const { SubscriptionValidate, ApplyValidate } = require('../../validators/exam')

module.exports = class ExamController {
  constructor({ ExamService, LoggerService }) {
    this.LoggerService = LoggerService
    this.ExamService = ExamService
  }

  start = async (request, response, next) => {
    const step = this.LoggerService.addStep('ExamControllerStart')
    try {
      const subscriptionKey = request.params.subscriptionKey
      const contract = SubscriptionValidate(subscriptionKey)

      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await this.ExamService.start(subscriptionKey)

      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }

  finalize = async (request, response, next) => {
    const step = this.LoggerService.addStep('ExamControllerStart')
    try {
      const subscriptionKey = request.params.subscriptionKey
      const contract = ApplyValidate(request.body)

      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await this.ExamService.finalize(
        subscriptionKey,
        request.body
      )

      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
