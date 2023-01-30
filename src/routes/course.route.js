const express = require('express')
const router = express.Router()

const CourseController = require('../controllers/course.controller')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.get('/courses', TrackMiddleware.tracking, CourseController.courses)
router.get('/courses/:identifier', TrackMiddleware.tracking, CourseController.getCourse)
router.get('/trending', TrackMiddleware.tracking, CourseController.getCourseTrending)
router.get('/most-wanted', TrackMiddleware.tracking, CourseController.getCourseMostWanted)
router.get('/study-at-home', TrackMiddleware.tracking, CourseController.getCourseStudyAtHome)
router.get('/higher-wages', TrackMiddleware.tracking, CourseController.getCourseHigherWages)
router.get('/areas', TrackMiddleware.tracking, CourseController.getCourseAreas)

module.exports = router
