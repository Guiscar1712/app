module.exports = class NotificationDeleteService {
  constructor({ LoggerService, NotificationRepository }) {
    this.LoggerService = LoggerService
    this.NotificationRepository = NotificationRepository
  }

  request = async (id, UserId) => {
    const step = this.LoggerService.addStep('NotificationDeleteService')
    try {
      const data = await this.NotificationRepository.deleteBy({ id, UserId })

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
