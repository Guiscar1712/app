const express = require('express')
const router = express.Router()
const TrackMiddleware = require('../../middlewares/trackMiddleware')

module.exports = ({ UserController, ResponseMiddleware }) => {
  router.post('/login', TrackMiddleware.tracking, UserController.login, ResponseMiddleware.Handler)
  router.post('/login-firebase', TrackMiddleware.tracking, UserController.loginFirebase, ResponseMiddleware.Handler)
  return router
}
