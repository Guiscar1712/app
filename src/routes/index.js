const express = require('express')
const router = express.Router()

const errorHandler = require('../middlewares/errorHandler')

// router.use('/api/test', require('./test.route'))
router.use('/api/user', require('./user.route'), errorHandler)
router.use('/api/subscription', require('./subscription.route'), errorHandler)
router.use('/api/course', require('./course.route'), errorHandler)
router.use('/api/notification-preference', require('./notificationPreference.route'), errorHandler)
router.use('/api/notification', require('./notification.route'), errorHandler)
router.use('/api/register-app', require('./registerApp.route'), errorHandler)
router.use('/api/exam', require('./exam.route'), errorHandler)
router.use('/api/cep', require('./cep.route'), errorHandler)

module.exports = router
