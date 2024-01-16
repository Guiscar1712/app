const express = require('express')
const router = express.Router()
const errorHandler = require('../../../middlewares/errorHandler')

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
    /*  #swagger.tags = ['Enrollment']
        #swagger.description = 'Endpoint to sign in a specific Enrollment' */
    /*  #swagger.security = [{ "bearerAuth": [] }]  */
    // #swagger.deprecated = true
    const { EnrollmentsController } = req.container.cradle
    EnrollmentsController.getDetails(req, res, next)
  },
  errorHandler
)

module.exports = router
