const NotificationRequest = require('../../../dto/notification/notification.request')

module.exports = class NotificationSaveController {
  constructor({ LoggerService, NotificationService }) {
    this.LoggerService = LoggerService
    this.NotificationService = NotificationService
  }

  request = async (request, response, next) => {
    const step = this.LoggerService.addStep('NotificationSaveController')
    try {
      const userId = request.user.id
      const body = request.body
      const notification = new NotificationRequest({ userId, ...body })

      const data = await this.NotificationService.save(notification)
      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }
}
