const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')

//router.post('/login', UserController.login)
//router.get('/isAuthenticated', UserController.isAuthenticated)

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/:id', UserController.get)
router.get('/', UserController.list)

module.exports = router
