const express = require('express')
const router = express.Router()

const NotificationController = require('../../controllers/v1/notification.controller')

const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.post('/', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.save)
router.get('/', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.get)
router.get('/:id', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.getById)

module.exports = router
