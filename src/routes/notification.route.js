const express = require('express')
const router = express.Router()

const NotificationController = require('../controllers/notification.controller')

const AuthMiddleware = require('../middlewares/authMiddleware')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.get(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.get
)
router.get(
  '/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.getById
)
router.post(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.insert
)
router.put(
  '/read/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.notificationRead
)
router.put(
  '/all-read',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.notificationAllRead
)
router.put(
  '/not-read/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.notificationNotRead
)
router.delete(
  '/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.delete
)

router.post(
  '/send-to-topic',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  NotificationController.sendNotificationTopic
)
router.post(
  '/send-to-client',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.sendNotificationClient
)
router.post(
  '/subscribe-topic',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  NotificationController.subscribeToTopic
)
router.post(
  '/unsubscribe-topic',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  NotificationController.unsubscribeFromTopic
)

router.post(
  '/send-sms',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  NotificationController.sendSMS
)

module.exports = router
