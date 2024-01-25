const express = require('express')
const router = express.Router()

const NotificationController = require('../../../controllers/v1/notification.controller')

const AuthMiddleware = require('../../../middlewares/authMiddleware')
const TrackMiddleware = require('../../../middlewares/trackMiddleware')

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

module.exports = router
