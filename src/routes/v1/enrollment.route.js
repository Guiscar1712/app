const express = require('express')
const router = express.Router()

const enrollmentsController = require('../../controllers/v1/enrollments.controller')
const authMiddleware = require('../../middlewares/authMiddleware')
const trackMiddleware = require('../../middlewares/trackMiddleware')
const errorHandler = require('../../middlewares/errorHandler')

module.exports = ({
  AuthMiddleware,
  TrackMiddleware,
  EnrollmentsController,
  ResponseMiddleware,
}) => {
  router.get(
    '/:document',
    trackMiddleware.tracking,
    authMiddleware.isAuthenticated,
    enrollmentsController.get,
    errorHandler
  )
  router.get(
    '/:idOrigin/details',
    TrackMiddleware.tracking('ENROLLMENTS_DETAILS'),
    AuthMiddleware.isAuthenticated,
    EnrollmentsController.getDetails,
    errorHandler
  )

  return router
}
