const express = require('express')
const router = express.Router()

router.use(require('./address.zipCode'))

module.exports = router
