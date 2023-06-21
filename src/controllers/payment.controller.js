const paymentService = require('../services/payment.service')
const { SubscriptionValidate } = require('../validators/exam')

module.exports = class NotificationPreferenceController {
  static async paymentPix (request, response, next) {
    try {
      const subscriptionKey = request.params.subscriptionKey
      const contract = SubscriptionValidate(subscriptionKey)
      if (!contract.isValid()) {
        return response.status(400).send(contract.errors()).end()
      }
      const data = await paymentService.pix(subscriptionKey)

      if (data.error) {
        return response.status(400).json(data)
      }

      return response.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
}
