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
  // #swagger.tags = ['Preference Notification']
  /*  #swagger.security = [{ "token": [] }]  */
)
router.post(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationPreferenceController.insert
  // #swagger.tags = ['Preference Notification']
  /*  #swagger.security = [{ "token": [] }]  */
  /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Preference Notification information.',
            required: true,
            schema:{ "preference":3}}*/
)
router.delete(
  '/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationPreferenceController.delete
  // #swagger.tags = ['Preference Notification']
  /*  #swagger.security = [{ "token": [] }]  */
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'Preference Notification information.',
            required: true
    } */
)

module.exports = router
