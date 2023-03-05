
const moment = require('moment')
const NotificationRepository = require('../repositories/notificationRepository')

module.exports = class Notification {
  static async list (UserId) {
    return await NotificationRepository.filterBy({ UserId })
  }

  static async getById (Id, UserId) {
    return await NotificationRepository.findBy({ Id, UserId })
  }

  static async insert (Title, Content, NotificationId, UserId) {
    if (!Title || !Content || !NotificationId) {
      throw new Error('Os Campos "Title, Content e NotificationId" são obrigatórios')
    }

    const hasNotification = await NotificationRepository.findBy({ NotificationId, UserId })

    if (hasNotification) {
      return hasNotification
    }

    return await NotificationRepository.insert({ Title, Content, NotificationId, UserId })
  }

  static async notificationRead (id, UserId) {
    const DateRead = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
    return await NotificationRepository.update(id, UserId, { DateRead })
  }

  static async delete (id, UserId) {
    return await NotificationRepository.deleteBy({ id, UserId })
  }
}
