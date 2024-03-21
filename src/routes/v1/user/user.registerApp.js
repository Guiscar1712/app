const express = require('express')
const router = express.Router()

router.post(
  '/register-app',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('USER_REGISTER_APP', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific User Register App' */
    const { UserController } = req.container.cradle
    UserController.registerApp(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
