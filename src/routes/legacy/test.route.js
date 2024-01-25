const express = require('express')
const router = express.Router()

const TestController = require('../../controllers/test.controller')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.get('/run', TrackMiddleware.tracking, TestController.run)
router.get('/do', TrackMiddleware.tracking, TestController.dowork)

module.exports = router
