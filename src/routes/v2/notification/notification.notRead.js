const express = require('express')
const router = express.Router()

router.put(
  '/not-read/:id',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('NOTIFICATION_NOT_READ', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['Notification']
        #swagger.description = 'Endpoint to sign in a specific Notification' */

    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'Notification information.',
            required: true
    } */

    /*  #swagger.security = [{ "token": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: {
	"success": true,
	"data": {
		"dateRead": null,
		"userId": 1286
	}
},
        description: "Successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { NotificationController } = req.container.cradle
    NotificationController.notRead(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
