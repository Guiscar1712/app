const express = require('express')
const router = express.Router()

const errorHandler = require('../../middlewares/errorHandler')

router.use('/user', require('./user.route'), errorHandler)
router.use('/subscription', require('./subscription.route'), errorHandler)
router.use('/course', require('./course.route'), errorHandler)
router.use(
  '/notification-preference',
  require('./notificationPreference.route'),
  errorHandler
)
router.use('/notification', require('./notification.route'), errorHandler)
router.use('/register-app', require('./registerApp.route'), errorHandler)
router.use('/exam', require('./exam.route'), errorHandler)
router.use('/cep', require('./cep.route'), errorHandler)

module.exports = router
