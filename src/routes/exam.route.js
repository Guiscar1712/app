const express = require('express')
const router = express.Router()

const ExameController = require('../controllers/exam.controller')

const AuthMiddleware = require('../middlewares/authMiddleware')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.post('/', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.apply)
router.get('/eligible/:subscription', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ExameController.eligible)

module.exports = router
