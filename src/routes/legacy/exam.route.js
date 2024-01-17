const express = require('express')
const router = express.Router()

const ExameController = require('../../controllers/exam.controller')

const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.get(
  '/eligible/:subscriptionKey',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  ExameController.eligible
  // #swagger.tags = ['Exam']
  // #swagger.deprecated = true
)
router.get(
  '/instructions',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  ExameController.getInstructions
  // #swagger.tags = ['Exam']
  // #swagger.deprecated = true
)
router.post(
  '/start/:subscriptionKey',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  ExameController.startExam
  // #swagger.tags = ['Exam']
  // #swagger.deprecated = true
)
router.post(
  '/finalize/:subscriptionKey',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  ExameController.finalizeExam
  // #swagger.tags = ['Exam']
  // #swagger.deprecated = true
)

module.exports = router
