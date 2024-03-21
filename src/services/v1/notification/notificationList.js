module.exports = class NotificationListService {
  constructor({ LoggerService, NotificationRepository }) {
    this.LoggerService = LoggerService
    this.NotificationRepository = NotificationRepository
  }

  request = async (userId) => {
    const step = this.LoggerService.addStep('NotificationListService')
    try {
      const data = await this.NotificationRepository.filterBy({ userId })

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
