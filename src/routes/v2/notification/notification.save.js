const express = require('express')
const router = express.Router()

router.post(
  '/',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('NOTIFICATION_SAVE', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['Notification']
        #swagger.description = 'Endpoint to sign in a specific Notification' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Auth Request information.',
            required: true,
            schema: { $notificationId:10002, $title: "Notificaçcao 10002", $content: "todo conteudo da notificação", data: { paymentType: "PIX", statusPayment: "PAID", idOrigin: 13542165}}
      } */

    /*  #swagger.security = [{ "token": [] }]  */

    /*  #swagger.responses[200] = { 
        schema:  
        {
	"success": true,
	"data": {
		"id": 438,
		"createdAt": "2024-03-12T09:46:46.936Z",
		"title": "Notificaçcao 10002",
		"content": "todo conteudo da notificação",
		"data": "{\"invoiceType\":\"PreMatricula\",\"notificationType\":\"PAYMENT\",\"paymentType\":\"PIX\",\"statusPayment\":\"PAID\",\"idOrigin\":13542165,\"totalAmount\":9.9,\"paymentDate\":\"2023-07-12T09:52:18.6406672+00:00\"}",
		"notificationType": null,
		"dateRead": null,
		"userId": 1286
	}
}
              }*/

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { NotificationController } = req.container.cradle
    NotificationController.save(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router