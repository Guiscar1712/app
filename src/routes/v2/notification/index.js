const express = require('express')
const router = express.Router()

router.use(require('./notification.list'))
router.use(require('./notification.getById'))
router.use(require('./notification.read'))
router.use(require('./notification.readAll'))
router.use(require('./notification.notRead'))
router.use(require('./notification.save'))
router.use(require('./notification.delete'))

module.exports = router
