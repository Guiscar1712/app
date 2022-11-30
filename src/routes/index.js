const express = require('express')
const router = express.Router()

router.use('/api/user', require('./user.route'))
router.use('/api/file', require('./file.route'))

module.exports = router
