module.exports = class NotificationReadController {
  constructor({ LoggerService, NotificationService }) {
    this.LoggerService = LoggerService
    this.NotificationService = NotificationService
  }

  request = async (request, response, next) => {
    const step = this.LoggerService.addStep('NotificationReadController')
    try {
      const data = await this.NotificationService.read(
        request.params.id,
        request.user.id
      )
      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }
}
