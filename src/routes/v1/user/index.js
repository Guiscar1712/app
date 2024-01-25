const express = require('express')
const router = express.Router()

router.use(require('./user.login'))
router.use(require('./user.loginFirebase'))
router.use(require('./user.register'))
router.use(require('./user.userDataConsult'))
router.use(require('./user.userDataUpdate'))

module.exports = router
