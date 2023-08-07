const express = require('express')
const router = express.Router()
const { cradle } = require('./../../config/di')
const errorHandler = require('../../middlewares/errorHandler')

router.use('/user', require('./user.route')(cradle))
router.use('/enrollment', require('./enrollment.route'), errorHandler)
router.use('/payment', require('./payment.route'), errorHandler)
router.use('/notification', require('./notification.route'), errorHandler)
router.use('/contract', require('./contract.route'), errorHandler)
router.use('/course', require('./course.route'), errorHandler)

module.exports = router
