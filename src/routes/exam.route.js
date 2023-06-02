const express = require('express')
const router = express.Router()

const ExameController = require('../controllers/exam.controller')

const AuthMiddleware = require('../middlewares/authMiddleware')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.get('/eligible/:subscriptionKey', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.eligible)
router.get('/instructions', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.getInstructions)
router.post('/start/:subscriptionKey', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.startExam)
router.post('/finalize/:subscriptionKey', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.finalizeExam)

// router.post('/', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.apply)
// router.get('/essay-theme/:subscriptionKey', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.getEssayTheme)
// router.get('/status/:subscriptionKey', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.getStatus)

module.exports = router
