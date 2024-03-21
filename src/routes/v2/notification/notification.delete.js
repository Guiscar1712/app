const express = require('express')
const router = express.Router()

router.delete(
  '/:id',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('NOTIFICATION_DELETE', req, res, next)
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
	"data": [
		{
			"id": 437,
			"createdAt": "2024-03-12T09:38:31.383Z",
			"title": "Notificaçcao 10001",
			"content": "todo conteudo da notificação",
			"data": null,
			"notificationType": null,
			"dateRead": null,
			"userId": 1286
		}
	]
},
        description: "Successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { NotificationController } = req.container.cradle
    NotificationController.delete(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
