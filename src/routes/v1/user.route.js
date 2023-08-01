const express = require('express')
const router = express.Router()
const TrackMiddleware = require('../../middlewares/trackMiddleware')

module.exports = ({ UserController, ErrorMiddleware }) => {
  router.post('/login', TrackMiddleware.tracking, UserController.login, ErrorMiddleware.Handler)
  return router
}
