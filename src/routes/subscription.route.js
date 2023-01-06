const express = require('express')
const router = express.Router()

const SubscriptionController = require('../controllers/subscription.controller')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.get('/:cpf', TrackMiddleware.tracking, SubscriptionController.get)
router.post('/', TrackMiddleware.tracking, SubscriptionController.post)

module.exports = router
