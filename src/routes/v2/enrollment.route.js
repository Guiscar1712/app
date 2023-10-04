const express = require('express')
const router = express.Router()

module.exports = ({
  AuthMiddleware,
  TrackMiddleware,
  EnrollmentsController,
  ResponseMiddleware,
}) => {
  router.get(
    '/:idOrigin/details',
    TrackMiddleware.tracking('ENROLLMENTS_DETAILS'),
    AuthMiddleware.isAuthenticated,
    EnrollmentsController.getDetailsV2,
    ResponseMiddleware.Handler
  )

  return router
}
