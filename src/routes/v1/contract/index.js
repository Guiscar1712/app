const express = require('express')
const router = express.Router()

router.use(require('./contract.list'))
router.use(require('./contract.detail'))
router.use(require('./contract.accept'))

module.exports = router
