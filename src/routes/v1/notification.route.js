const express = require('express')
const router = express.Router()

const NotificationController = require('../../controllers/v1/notification.controller')

const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.post('/', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.save)
router.get('/', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.get)
router.get('/:id', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.getById)
router.delete('/:id', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.delete)
router.put('/read/:id', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.read)
router.put('/all-read', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.readAll)
router.put('/not-read/:id', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, NotificationController.readNot)

module.exports = router
