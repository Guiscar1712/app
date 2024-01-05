const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')

const AuthMiddleware = require('../middlewares/authMiddleware')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.post('/register', TrackMiddleware.tracking, UserController.register)
router.post('/login', TrackMiddleware.tracking, UserController.login)
router.post(
  '/login-firebase',
  TrackMiddleware.tracking,
  UserController.loginFirebase
)
router.post('/validate', TrackMiddleware.tracking, UserController.validateCode)

router.post(
  '/changePassword',
  TrackMiddleware.tracking,
  UserController.changePassword
)
router.post(
  '/recoverPassword',
  TrackMiddleware.tracking,
  UserController.recoverPassword
)

router.post(
  '/getRecoveryKey',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  UserController.getRecoveryKey
)

router.put(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.update
)
router.post(
  '/photo',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.photo
)

router.get(
  '/me',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.getMe
)
router.get(
  '/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.get
)
router.get(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  UserController.list
)

router.delete(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.delete
)

module.exports = router
