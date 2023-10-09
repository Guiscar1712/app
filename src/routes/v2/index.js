const express = require('express')
const router = express.Router()
const errorHandler = require('../../middlewares/errorHandler')

router.use('/enrollment', require('./enrollment.route'))

module.exports = router
