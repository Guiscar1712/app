const express = require('express')
const router = express.Router()

const SubscriptionController = require('../controllers/subscription.controller')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.get('/courses', TrackMiddleware.tracking, SubscriptionController.courses)
router.get('/courses/:identifier', TrackMiddleware.tracking, SubscriptionController.getCourse)

router.get('/:cpf', TrackMiddleware.tracking, SubscriptionController.get)
router.post('/', TrackMiddleware.tracking, SubscriptionController.post)

module.exports = router
