const express = require('express')
const router = express.Router()

const ExameController = require('../controllers/exam.controller')

const AuthMiddleware = require('../middlewares/authMiddleware')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.post('/', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.apply)
router.get('/eligible/:subscriptionKey', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.eligible)
router.get('/essay-theme', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.getEssayTheme)
router.get('/instructions', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.getInstructions)
router.get('/status/:subscriptionKey', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.getStatus)

module.exports = router
