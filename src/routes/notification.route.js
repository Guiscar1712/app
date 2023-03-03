const express = require('express')
const router = express.Router()

const NotificationController = require('../controllers/notification.controller')

const AuthMiddleware = require('../middlewares/authMiddleware')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.get('/', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.get)
router.get('/:id', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.getById)
router.post('/', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.insert)
router.put('/read/:id', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.notificationRead)
router.delete('/:id', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.delete)

module.exports = router
