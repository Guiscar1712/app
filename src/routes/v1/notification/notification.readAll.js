const express = require('express')
const router = express.Router()

const NotificationController = require('../../../controllers/v1/notification.controller')

const AuthMiddleware = require('../../../middlewares/authMiddleware')
const TrackMiddleware = require('../../../middlewares/trackMiddleware')

router.put(
  '/all-read',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.readAll
  // #swagger.tags = ['Notification']
  /*  #swagger.security = [{ "token": [] }]  */
)

module.exports = router
