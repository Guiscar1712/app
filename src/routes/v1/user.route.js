const express = require('express')
const router = express.Router()
const TrackMiddleware = require('../../middlewares/trackMiddleware')

module.exports = ({ UserController }) => {
  router.post('/login', TrackMiddleware.tracking, UserController.login)
  return router
}
