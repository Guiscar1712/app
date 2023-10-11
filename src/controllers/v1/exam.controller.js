const { ValidationError } = require('../../utils/errors')

const { SubscriptionValidate } = require('../../validators/exam')

module.exports = class ExamController {
  constructor({ ExamService, LoggerService }) {
    this.LoggerService = LoggerService
    this.ExamService = ExamService
  }

  start = async (request, response, next) => {
    const step = this.LoggerService.addStepStepTrace('ExamControllerStart')
    try {
      const subscriptionKey = request.params.subscriptionKey
      const contract = SubscriptionValidate(subscriptionKey)

      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await this.ExamService.start(subscriptionKey)

      this.LoggerService.finalizeStep(step.value, step.key, data)
      next(data)
    } catch (error) {
      next(error)
    }
  }
}
