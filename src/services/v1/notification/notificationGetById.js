module.exports = class NotificationGetByIdService {
  constructor({ LoggerService, NotificationRepository }) {
    this.LoggerService = LoggerService
    this.NotificationRepository = NotificationRepository
  }

  request = async (Id, UserId) => {
    const step = this.LoggerService.addStep('NotificationGetByIdService')
    try {
      const data = await this.NotificationRepository.find({ Id, UserId })

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
