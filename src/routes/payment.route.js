const express = require('express')
const router = express.Router()

const PaymentController = require('../controllers/payment.controller')

const AuthMiddleware = require('../middlewares/authMiddleware')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.get('/pix/:subscriptionKey', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, PaymentController.paymentPix)

module.exports = router
