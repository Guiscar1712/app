const express = require('express')
const router = express.Router()

const NotificationController = require('../../controllers/notification.controller')

const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.get(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.get
  // #swagger.tags = ['Notification']
  /*  #swagger.security = [{ "token": [] }]  */
)
router.get(
  '/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.getById
  // #swagger.tags = ['Notification']
  /*  #swagger.security = [{ "token": [] }]  */
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'Notification information.',
            required: true
    } */
)
router.post(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.insert
  // #swagger.tags = ['Notification']
  /*  #swagger.security = [{ "token": [] }]  */
  /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Register App information.',
            required: true,
            schema: {	"Title": "Notificaçcao 3",
                      "Content": "todo conteudo da notificação" }}*/
  // #swagger.deprecated = true
)
router.put(
  '/read/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.notificationRead
  // #swagger.tags = ['Notification']
  /*  #swagger.security = [{ "token": [] }]  */
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'Notification information.',
            required: true
    } */
  // #swagger.deprecated = true
)
router.put(
  '/all-read',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.notificationAllRead
  // #swagger.tags = ['Notification']
  /*  #swagger.security = [{ "token": [] }]  */
  // #swagger.deprecated = true
)
router.put(
  '/not-read/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.notificationNotRead
  // #swagger.tags = ['Notification']
  /*  #swagger.security = [{ "token": [] }]  */
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'Notification information.',
            required: true
    } */
)
router.delete(
  '/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.delete
  // #swagger.tags = ['Notification']
  /*  #swagger.security = [{ "token": [] }]  */
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'Notification information.',
            required: true
    } */
)

router.post(
  '/send-to-topic',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  NotificationController.sendNotificationTopic
  // #swagger.ignore = true
)
router.post(
  '/send-to-client',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.sendNotificationClient
  // #swagger.ignore = true
)
router.post(
  '/subscribe-topic',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  NotificationController.subscribeToTopic
  // #swagger.ignore = true
)
router.post(
  '/unsubscribe-topic',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  NotificationController.unsubscribeFromTopic
  // #swagger.ignore = true
)

router.post(
  '/send-sms',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  NotificationController.sendSMS
  // #swagger.ignore = true
)

module.exports = router
