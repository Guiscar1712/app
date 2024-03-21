module.exports = class NotificationListController {
  constructor({ LoggerService, NotificationService }) {
    this.LoggerService = LoggerService
    this.NotificationService = NotificationService
  }

  request = async (request, response, next) => {
    const step = this.LoggerService.addStep('NotificationListController')
    try {
      const data = await this.NotificationService.list(request.user.id)
      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }
}
