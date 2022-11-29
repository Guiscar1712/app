const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')

//router.post('/login', UserController.login)
//router.get('/isAuthenticated', UserController.isAuthenticated)

router.post('/register', UserController.register)
router.post('/update', UserController.update)
router.post('/login', UserController.login)
router.post('/validate', UserController.validateCode)
router.post('/changePassword', UserController.changePassword)
router.post('/recoverPassword', UserController.recoverPassword)

router.get('/:id', UserController.get)
router.get('/', UserController.list)

module.exports = router
