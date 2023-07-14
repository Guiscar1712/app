const express = require('express')
const router = express.Router()

router.use('/enrollment', require('./enrollment.route'))
router.use('/payment', require('./payment.route'))
router.use('/notification', require('./notification.route'))
router.use('/contract', require('./contract.route'))

module.exports = router
