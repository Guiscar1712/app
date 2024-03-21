module.exports = class NotificationSaveService {
  constructor({ LoggerService, NotificationRepository }) {
    this.LoggerService = LoggerService
    this.NotificationRepository = NotificationRepository
  }

  request = async (notification) => {
    const step = this.LoggerService.addStep('NotificationSaveService')
    try {
      const data = await this.NotificationRepository.insert(notification)

      step.value.addData(data)
      return data
    } catch (error) {
      step.value.addData(error)
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
