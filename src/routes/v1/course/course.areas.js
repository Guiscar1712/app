const express = require('express')
const router = express.Router()

const CourseController = require('../../../controllers/v1/course.controller')
const TrackMiddleware = require('../../../middlewares/trackMiddleware')

router.get('/areas', TrackMiddleware.tracking, CourseController.getCourseAreas)

module.exports = router
