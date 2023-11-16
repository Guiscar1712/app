const express = require('express')
const router = express.Router()

router.post(
  '/validate',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('AUTH_VALIDATE', req, res, next)
  },
  (req, res, next) => {
    const { AuthController } = req.container.cradle
    AuthController.validate(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
