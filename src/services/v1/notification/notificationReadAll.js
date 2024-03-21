module.exports = class NotificationReadAllService {
  constructor({ LoggerService, NotificationRepository }) {
    this.LoggerService = LoggerService
    this.NotificationRepository = NotificationRepository
  }

  request = async (UserId) => {
    const step = this.LoggerService.addStep('NotificationReadAllService')
    try {
      const query = { UserId, DateRead: null }
      const notifications = await this.NotificationRepository.filterBy(query)

      const notificationsIds = notifications.map((f) => {
        return f.id
      })

      const DateRead = new Date().toJSON()
      const data = await this.NotificationRepository.updateByIds(
        notificationsIds,
        {
          DateRead,
        }
      )

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
