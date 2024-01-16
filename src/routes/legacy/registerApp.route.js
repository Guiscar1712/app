const express = require('express')
const router = express.Router()

const RegisterAppController = require('../../controllers/registerApp.controller')

const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.post(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  RegisterAppController.register
)

module.exports = router
