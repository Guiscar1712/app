const express = require('express')
const router = express.Router()

const NotificationController = require('../../../controllers/v1/notification.controller')

const AuthMiddleware = require('../../../middlewares/authMiddleware')
const TrackMiddleware = require('../../../middlewares/trackMiddleware')

router.put(
  '/read/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.read
)

module.exports = router
