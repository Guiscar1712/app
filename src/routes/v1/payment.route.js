const express = require('express')
const router = express.Router()

const PaymentController = require('../../controllers/v1/payment.controller')

const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.get('/pix/:originId', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, PaymentController.paymentPix)
router.get('/status/:originId', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, PaymentController.paymentStatus)

module.exports = router
