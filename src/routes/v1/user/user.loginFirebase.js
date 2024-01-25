const express = require('express')
const router = express.Router()

router.post(
  '/login-firebase',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('USER_LOGIN_FIREBASE', req, res, next)
  },
  (req, res, next) => {
    const { UserController } = req.container.cradle
    UserController.loginFirebase(req, res, next)
  },
  (data, req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific User' */
    // #swagger.deprecated = true
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
