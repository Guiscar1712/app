const express = require('express')
const router = express.Router()

router.use(require('./enrollment.get'))
router.use(require('./enrollment.details'))

module.exports = router
