const express = require('express')
const router = express.Router()

router.get(
  '/pix/:originId',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('PAYMENT_PIX', req, res, next)
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

    /*  #swagger.security = [{ "bearerAuth": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
	                "data": { "expiresIn":"2024-01-09T02:26:04.626Z",
                    "qrCode":"0002010102122682001x2560pix.stone.com.br/pix/v8ea4ac9c6540559.005802BR5925EDIT3396",
                    "qrCodeUrl":"https://api.par.me/core/v5/transactions/tran_LGX8nlR7P/qrcode?payment_method=pix",
                    "totalAmount": 59}},
        description: "Validate successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { PaymentController } = req.container.cradle
    PaymentController.paymentPix(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
