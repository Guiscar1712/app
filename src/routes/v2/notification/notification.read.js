const express = require('express')
const router = express.Router()

router.put(
  '/read/:id',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('NOTIFICATION_READ', req, res, next)
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
		"dateRead": "2024-03-12T10:02:49.362Z",
		"userId": 1286
	}
},
        description: "Successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { NotificationController } = req.container.cradle
    NotificationController.read(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
