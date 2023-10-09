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
    const { PaymentController } = req.container.cradle
    PaymentController.paymentPix(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)
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
    const { PaymentController } = req.container.cradle
    PaymentController.paymentStatus(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
