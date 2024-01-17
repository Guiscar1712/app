const express = require('express')
const router = express.Router()

const CourseController = require('../../controllers/course.controller')
const SubscriptionController = require('../../controllers/subscription.controller')
const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.get(
  '/:cpf',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  SubscriptionController.get
  // #swagger.tags = ['Subscription']
  /*  #swagger.security = [{ "token": [] }]  */

  // #swagger.deprecated = true
)
router.post(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  SubscriptionController.post
  // #swagger.tags = ['Subscription']
  /*  #swagger.security = [{ "token": [] }]  */

  // #swagger.deprecated = true
)

router.get(
  '/courses',
  TrackMiddleware.tracking,
  CourseController.courses
  // #swagger.ignore = true
)
router.get(
  '/courses/:identifier',
  TrackMiddleware.tracking,
  CourseController.getCourse
  // #swagger.ignore = true
)

module.exports = router
