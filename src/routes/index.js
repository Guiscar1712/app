const express = require('express')
const router = express.Router()

// router.use('/api/test', require('./test.route'))
router.use('/api/user', require('./user.route'))
router.use('/api/subscription', require('./subscription.route'))

module.exports = router
