const express = require('express')
const router = express.Router()

const NotificationController = require('../../../controllers/v1/notification.controller')

const AuthMiddleware = require('../../../middlewares/authMiddleware')
const TrackMiddleware = require('../../../middlewares/trackMiddleware')

router.delete(
  '/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.delete
  // #swagger.deprecated = true
)

module.exports = router
