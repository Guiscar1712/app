const express = require('express')
const router = express.Router()

router.use(require('./user.login'))
router.use(require('./user.loginFirebase'))
router.use(require('./user.register'))
router.use(require('./user.userDataConsult'))
router.use(require('./user.userDataUpdate'))
router.use(require('./user.registerApp'))
router.use(require('./user.cards'))

module.exports = router
