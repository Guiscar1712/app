const ExamService = require('../services/exam.service')
const { ApplyValidateApply, SubscriptionValidate } = require('../validators/exam')

module.exports = class NotificationPreferenceController {
  static async apply (request, response, next) {
    try {
      const contract = ApplyValidateApply(request.body)

      if (!contract.isValid()) {
        return response.status(400).send(contract.errors()).end()
      }

      const data = await ExamService.apply(request.body, request.user.id)
      response.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async eligible (request, response, next) {
    try {
      const subscription = request.params.subscription

      const contract = SubscriptionValidate(subscription)
      if (!contract.isValid()) {
        return response.status(400).send(contract.errors()).end()
      }

      const data = await ExamService.eligible(subscription, request.user.id)

      if (data.errors) {
        return response.status(400).json(data.errors)
      }
      return response.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
