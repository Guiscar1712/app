const express = require('express')
const router = express.Router()

const paymentController = require('../../controllers/v1/payment.controller')
const authMiddleware = require('../../middlewares/authMiddleware')
const trackMiddleware = require('../../middlewares/trackMiddleware')
const errorHandler = require('../../middlewares/errorHandler')

module.exports = ({ TrackMiddleware, AuthMiddleware, PaymentController, ResponseMiddleware }) => {
  // new
  router.get('/pix/:originId', TrackMiddleware.tracking('PAYMENT_PIX'), AuthMiddleware.isAuthenticated, PaymentController.paymentPix, ResponseMiddleware.Handler)

  // TODO: Implement DI Logger
  // router.get('/status/:originId', trackMiddleware.tracking, authMiddleware.isAuthenticated, paymentController.paymentStatus, errorHandler)

  return router
}
