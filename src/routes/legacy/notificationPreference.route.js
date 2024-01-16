const express = require('express')
const router = express.Router()

const NotificationPreferenceController = require('../../controllers/notificationPreference.controller')

const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.get(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationPreferenceController.get
)
router.post(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationPreferenceController.insert
)
router.delete(
  '/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationPreferenceController.delete
)

module.exports = router
