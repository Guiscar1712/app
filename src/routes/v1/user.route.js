const express = require('express')
const router = express.Router()

router.post(
  '/login',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('USER_LOGIN', req, res, next)
  },
  (req, res, next) => {
    const { UserController } = req.container.cradle
    UserController.login(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

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
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

router.post(
  '/register',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('USER_REGISTER', req, res, next)
  },
  (req, res, next) => {
    const { UserController } = req.container.cradle
    UserController.register(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

router.get(
  '/:cpf/personal-data',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('USER_DATA_CONSULT', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    const { UserController } = req.container.cradle
    UserController.personalDataGet(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

router.patch(
  '/:cpf/personal-data',

  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('USER_DATA_UPDATE', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    const { UserController } = req.container.cradle
    UserController.personalDataUpdate(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
