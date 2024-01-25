const express = require('express')
const router = express.Router()

router.use(require('./payment.pix'))
router.use(require('./payment.pisStatus'))

module.exports = router
