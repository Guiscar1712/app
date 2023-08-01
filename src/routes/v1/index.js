const express = require('express')
const router = express.Router()
const { cradle } = require('./../../config/di')

router.use('/enrollment', require('./enrollment.route'))
router.use('/user', require('./user.route')(cradle))

module.exports = router
