const express = require('express')
const router = express.Router()

router.use('/enrollment', require('./enrollment.route'))
router.use('/payment', require('./payment.route'))
router.use('/notification', require('./notification.route'))

module.exports = router
