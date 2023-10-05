const express = require('express')
const router = express.Router()
const errorHandler = require('../../middlewares/errorHandler')

router.use('/enrollment', (req, res, next) =>
  require('./enrollment.route')(req.container.cradle)(req, res, next)
)

module.exports = router
