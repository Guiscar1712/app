const express = require('express')
const router = express.Router()

const NotificationController = require('../../../controllers/v1/notification.controller')

const AuthMiddleware = require('../../../middlewares/authMiddleware')
const TrackMiddleware = require('../../../middlewares/trackMiddleware')

router.get(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.get
  // #swagger.deprecated = true
)

module.exports = router
