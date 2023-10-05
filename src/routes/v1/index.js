const express = require('express')
const router = express.Router()
const { cradle } = require('./../../config/di')
const errorHandler = require('../../middlewares/errorHandler')

router.use('/enrollment', (req, res, next) =>
  require('./enrollment.route')(req.container.cradle)(req, res, next)
)
router.use('/user', (req, res, next) =>
  require('./user.route')(cradle)(req.container.cradle)(req, res, next)
)
router.use('/enrollment', (req, res, next) =>
  require('./enrollment.route')(cradle)(req.container.cradle)(req, res, next)
)
router.use('/payment', (req, res, next) =>
  require('./payment.route')(cradle)(req.container.cradle)(req, res, next)
)
router.use('/contract', (req, res, next) =>
  require('./contract.route')(cradle)(req.container.cradle)(req, res, next)
)

router.use('/notification', require('./notification.route'), errorHandler)
router.use('/course', require('./course.route'), errorHandler)

module.exports = router
