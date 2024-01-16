const express = require('express')
const router = express.Router()
const errorHandler = require('../../middlewares/errorHandler')

router.use('/user', require('./user'))
router.use('/auth', require('./auth'))
router.use('/enrollment', require('./enrollment'))
router.use('/payment', require('./payment'))
router.use('/contract', require('./contract'))
router.use('/exam', require('./exam'))

//Legado => Sem Logs
router.use('/notification', require('./notification'))
router.use('/course', require('./course'), errorHandler)

module.exports = router
