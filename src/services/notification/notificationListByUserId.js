const moment = require('moment')
const retry = require('../../utils/retry')
const { EnrollmentsDto } = require('../../dto/enrollment')
const Util = require('../../utils/util')

module.exports = class NotificationList {
  constructor({ LoggerService, NotificationRepository }) {
    this.LoggerService = LoggerService
    this.NotificationRepository = NotificationRepository
  }

  get = async (userId) => {
    const step = this.LoggerService.addStep('NotificationtServiceList')
    try {
      const order = { column: 'id', order: 'desc' }
      const data = await this.NotificationRepository.filterBy({ userId }, [
        order,
      ])

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
