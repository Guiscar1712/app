const express = require('express')
const router = express.Router()

router.use(require('./exam.testBegin'))
router.use(require('./exam.testFinish'))

module.exports = router
