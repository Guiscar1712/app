const { asClass } = require('awilix')

const NotificationRepository = require('../../../repositories/v2/notificationRepository')

const NotificationService = require('../../../services/v1/notification')
const NotificationGetByIdService = require('../../../services/v1/notification/notificationGetById')
const NotificationListService = require('../../../services/v1/notification/notificationList')
const NotificationReadService = require('../../../services/v1/notification/notificationRead')
const NotificationReadAllService = require('../../../services/v1/notification/notificationReadAll')
const NotificationNotReadService = require('../../../services/v1/notification/notificationNotRead')
const NotificationSaveService = require('../../../services/v1/notification/notificationSave')
const NotificationDeleteService = require('../../../services/v1/notification/notificationDelete')

const NotificationController = require('../../../controllers/v1/notification')
const NotificationGetByIdController = require('../../../controllers/v1/notification/notificationGetById.controller')
const NotificationListController = require('../../../controllers/v1/notification/notificationList.controller')
const NotificationReadController = require('../../../controllers/v1/notification/notificationRead.controller')
const NotificationReadAllController = require('../../../controllers/v1/notification/notificationReadAll.controller')
const NotificationNotReadController = require('../../../controllers/v1/notification/notificationNotRead.controller')
const NotificationSaveController = require('../../../controllers/v1/notification/notificationSave.controller')
const NotificationDeleteController = require('../../../controllers/v1/notification/notificationDelete.controller')

module.exports = {
  NotificationRepository: asClass(NotificationRepository),

  NotificationService: asClass(NotificationService),
  NotificationGetByIdService: asClass(NotificationGetByIdService),
  NotificationListService: asClass(NotificationListService),
  NotificationReadService: asClass(NotificationReadService),
  NotificationReadAllService: asClass(NotificationReadAllService),
  NotificationNotReadService: asClass(NotificationNotReadService),
  NotificationSaveService: asClass(NotificationSaveService),
  NotificationDeleteService: asClass(NotificationDeleteService),

  NotificationController: asClass(NotificationController),
  NotificationGetByIdController: asClass(NotificationGetByIdController),
  NotificationListController: asClass(NotificationListController),
  NotificationReadController: asClass(NotificationReadController),
  NotificationReadAllController: asClass(NotificationReadAllController),
  NotificationNotReadController: asClass(NotificationNotReadController),
  NotificationSaveController: asClass(NotificationSaveController),
  NotificationDeleteController: asClass(NotificationDeleteController),
}
