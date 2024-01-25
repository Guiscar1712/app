const express = require('express')
const router = express.Router()

const enrollmentsController = require('../../../controllers/v1/enrollments.controller')
const authMiddleware = require('../../../middlewares/authMiddleware')
const trackMiddleware = require('../../../middlewares/trackMiddleware')
const errorHandler = require('../../../middlewares/errorHandler')

router.get(
  '/:document',
  trackMiddleware.tracking,
  authMiddleware.isAuthenticated,
  enrollmentsController.get,
  /*  #swagger.tags = ['Enrollment']
        #swagger.description = 'Endpoint to sign in a specific Enrollment' */
  /*  #swagger.security = [{ "token": [] }]  */
  errorHandler
)

module.exports = router
