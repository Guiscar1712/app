const express = require('express')
const router = express.Router()

// router.use('/api/test', require('./test.route'))
router.use('/api/user', require('./user.route'))
router.use('/api/subscription', require('./subscription.route'))
router.use('/api/course', require('./course.route'))
router.use('/api/notification-preference', require('./notificationPreference.route'))

module.exports = router
