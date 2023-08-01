const express = require('express')
const router = express.Router()
const { cradle } = require('./../../config/di')
const errorHandler = require('../../middlewares/errorHandler')

router.use('/enrollment', require('./enrollment.route'), errorHandler)
router.use('/user', require('./user.route')(cradle))

module.exports = router
