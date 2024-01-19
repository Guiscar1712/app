const { asClass } = require('awilix')

const NotificationList = require('../../../services/notification/notificationListByUserId')
const NotificationRepository = require('../../../repositories/v1/notificationRepository')
const NotificationController = require('../../../controllers/v1/notification.controller')

module.exports = {
  NotificationRepository: asClass(NotificationRepository),
  NotificationList: asClass(NotificationList),
  NotificationController: asClass(NotificationController),
}
