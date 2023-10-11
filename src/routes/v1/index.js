const express = require('express')
const router = express.Router()
const { cradle } = require('./../../config/di')
const errorHandler = require('../../middlewares/errorHandler')

router.use('/user', require('./user.route'))
router.use('/enrollment', require('./enrollment.route'))
router.use('/payment', require('./payment.route'))
router.use('/contract', require('./contract.route'))
router.use('/exam', require('./exam.route'))

//Legado => Sem Logs
router.use('/notification', require('./notification.route'), errorHandler)
router.use('/course', require('./course.route'), errorHandler)

module.exports = router
