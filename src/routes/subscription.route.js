const express = require('express')
const router = express.Router()

const CourseController = require('../controllers/course.controller')
const SubscriptionController = require('../controllers/subscription.controller')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.get('/:cpf', TrackMiddleware.tracking, SubscriptionController.get)
router.post('/', TrackMiddleware.tracking, SubscriptionController.post)

router.get('/courses', TrackMiddleware.tracking, CourseController.courses)
router.get('/courses/:identifier', TrackMiddleware.tracking, CourseController.getCourse)

module.exports = router
