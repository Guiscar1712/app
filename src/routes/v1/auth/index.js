const express = require('express')
const router = express.Router()

router.use(require('./auth.validate'))
router.use(require('./auth.request'))
router.use(require('./auth.login'))
router.use(require('./auth.register'))
router.use(require('./auth.recovery'))
router.use(require('./auth.recoveryUpdate'))

module.exports = router
