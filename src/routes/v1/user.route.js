const express = require('express')
const router = express.Router()

module.exports = ({ TrackMiddleware, AuthMiddleware, UserController, ResponseMiddleware }) => {
  router.post('/login', TrackMiddleware.tracking('USER_LOGIN'), UserController.login, ResponseMiddleware.Handler)
  router.post('/login-firebase', TrackMiddleware.tracking('USER_LOGIN_FIREBASE'), UserController.loginFirebase, ResponseMiddleware.Handler)

  router.post('/register', TrackMiddleware.tracking('USER_REGISTER'), UserController.register, ResponseMiddleware.Handler)
  router.get('/:cpf/personal-data', TrackMiddleware.tracking('USER_DATA_CONSULT'), AuthMiddleware.isAuthenticated, UserController.getPersonalData, ResponseMiddleware.Handler)
  router.patch('/:cpf/personal-data', TrackMiddleware.tracking('USER_DATA_UPDATE'), AuthMiddleware.isAuthenticated, UserController.updatePersonalData, ResponseMiddleware.Handler)
  return router
}
