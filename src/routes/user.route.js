const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')

const AuthMiddleware = require('../middlewares/authMiddleware')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.post('/register', TrackMiddleware.tracking, UserController.register)
router.post('/login', TrackMiddleware.tracking, UserController.login)

router.post('/update', TrackMiddleware.tracking, UserController.update)
router.post('/validate', TrackMiddleware.tracking, UserController.validateCode)
router.post('/changePassword', TrackMiddleware.tracking, UserController.changePassword)
router.post('/recoverPassword', TrackMiddleware.tracking, UserController.recoverPassword)
router.post('/getRecoveryKey', TrackMiddleware.tracking, UserController.getRecoveryKey)

router.get('/me', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, UserController.getMe)
router.get('/:id', TrackMiddleware.tracking, UserController.get)
router.get('/', TrackMiddleware.tracking, UserController.list)

router.delete('/:id', TrackMiddleware.tracking, UserController.delete)

module.exports = router
