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
  // #swagger.tags = ['Notification']
  /*  #swagger.security = [{ "token": [] }]  */
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'Notification information.',
            required: true
    } */
  // #swagger.deprecated = true
)

module.exports = router
