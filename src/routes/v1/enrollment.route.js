const express = require('express')
const router = express.Router()

const EnrollmentsController = require('../../controllers/v1/enrollments.controller')
const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.get('/:document', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, EnrollmentsController.get)
router.get('/:idOrigin/details', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, EnrollmentsController.getDetails)

module.exports = router
