const express = require('express')
const router = express.Router()

const enrollmentsController = require('../../controllers/v1/enrollments.controller')
const authMiddleware = require('../../middlewares/authMiddleware')
const trackMiddleware = require('../../middlewares/trackMiddleware')
const errorHandler = require('../../middlewares/errorHandler')

router.get(
  '/:document',
  trackMiddleware.tracking,
  authMiddleware.isAuthenticated,
  enrollmentsController.get,
  errorHandler
)

router.get(
  '/:idOrigin/details',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('ENROLLMENTS_DETAILS', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    const { EnrollmentsController } = req.container.cradle
    EnrollmentsController.getDetails(req, res, next)
  },
  errorHandler
)

module.exports = router
