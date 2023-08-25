const express = require('express')
const router = express.Router()

module.exports = ({ TrackMiddleware, AuthMiddleware, PaymentController, ResponseMiddleware }) => {
  router.get('/pix/:originId', TrackMiddleware.tracking('PAYMENT_PIX'), AuthMiddleware.isAuthenticated, PaymentController.paymentPix, ResponseMiddleware.Handler)
  router.get('/status/:originId', TrackMiddleware.tracking('PAYMENT_PIX_STATUS'), AuthMiddleware.isAuthenticated, PaymentController.paymentStatus, ResponseMiddleware.Handler)
  return router
}
