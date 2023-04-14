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
      const subscriptionKey = request.params.subscriptionKey

      const contract = SubscriptionValidate(subscriptionKey)
      if (!contract.isValid()) {
        return response.status(400).send(contract.errors()).end()
      }

      const data = await ExamService.eligible(subscriptionKey, request.user.id)

      if (data.errors) {
        return response.status(400).json(data.errors)
      }
      return response.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getEssayTheme (request, response, next) {
    try {
      const data = await ExamService.getEssayTheme()

      if (data.errors) {
        return response.status(400).json(data.errors)
      }
      return response.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getInstructions (request, response, next) {
    try {
      const data = await ExamService.getInstructions()

      if (data.errors) {
        return response.status(400).json(data.errors)
      }
      return response.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getStatus (request, response, next) {
    try {
      const subscriptionKey = request.params.subscriptionKey
      const UserId = request.user.id

      const contract = SubscriptionValidate(subscriptionKey)
      if (!contract.isValid()) {
        return response.status(400).send(contract.errors()).end()
      }

      const data = await ExamService.getStatus(subscriptionKey, UserId)

      if (data === null) {
        return response.status(404).json([{ code: '40404', message: 'Registro não encontrado' }])
      }

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
