const express = require('express')
const router = express.Router()

router.use('/enrollment', require('./enrollment.route'))

module.exports = router
