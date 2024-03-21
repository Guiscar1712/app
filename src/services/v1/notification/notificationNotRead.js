module.exports = class NotificationNotReadService {
  constructor({ LoggerService, NotificationRepository }) {
    this.LoggerService = LoggerService
    this.NotificationRepository = NotificationRepository
  }

  request = async (id, UserId) => {
    const step = this.LoggerService.addStep('NotificationNotReadService')
    try {
      const DateRead = null
      const data = await this.NotificationRepository.update(id, UserId, {
        DateRead,
      })

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
