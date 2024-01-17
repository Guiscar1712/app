const express = require('express')
const router = express.Router()

router.get(
  '/status/:originId',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('PAYMENT_PIX_STATUS', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['Payment']
        #swagger.description = 'Endpoint to sign in a specific Payment' */

    /*  #swagger.parameters['originId'] = {
            in: 'path',
            description: 'Payment information.',
            required: true
    } */

    /*  #swagger.security = [{ "token": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
	                "data": {
                    "invoiceType":"PreMatricula",
                    "status":"GENERATED",
                    "totalAmount":59,
                    "type":"PIX"}},
        description: "Validate successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { PaymentController } = req.container.cradle
    PaymentController.paymentStatus(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
