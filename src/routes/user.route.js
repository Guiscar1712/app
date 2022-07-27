const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')

router.post('/login', UserController.login)
router.get('/isAuthenticated', UserController.isAuthenticated)
router.get('/', UserController.list)

module.exports = router
