const express = require('express')
const router = express.Router()

// router.use('/api/test', require('./test.route'))
router.use('/api/user', require('./user.route'))
router.use('/api/subscription', require('./subscription.route'))
router.use('/api/course', require('./course.route'))
router.use('/api/notification-preference', require('./notificationPreference.route'))
router.use('/api/notification', require('./notification.route'))
router.use('/api/register-app', require('./registerApp.route'))
router.use('/api/exam', require('./exam.route'))
router.use('/api/cep', require('./cep.route'))
router.use('/api/payment', require('./payment.route'))

module.exports = router
