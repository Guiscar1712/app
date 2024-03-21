const express = require('express')
const router = express.Router()

const NotificationController = require('../../../controllers/v1/notification.controller')

const AuthMiddleware = require('../../../middlewares/authMiddleware')
const TrackMiddleware = require('../../../middlewares/trackMiddleware')

router.post(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  NotificationController.save
  /*  #swagger.tags = ['Notification']
        #swagger.description = 'Endpoint to sign in a specific Exam' */

  /*  #swagger.security = [{ "token": [] }]  */

  /*  #swagger.responses[200] = { 
        schema: { "success": true,
	                "data": {
                    "duration":1571,
                    "eligible":"DONE",
                    "endDate":"2024-01-09T06:51:31.986",
                    "finishedOnline":true,
                    "maxAttempts":10,
                    "numberAttempts":2,
                    "startDate":"2024-01-08T04:41:17.824"}},
        description: "Validate successfully" } */

  /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
  // #swagger.deprecated = true
)

module.exports = router
