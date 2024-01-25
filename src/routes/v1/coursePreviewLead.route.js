const express = require('express')
const router = express.Router()

router.post(
  '/start',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('COURSE_PREVIEW_LEAD_START', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.optionalAuthentication(req, res, next)
  },
  (req, res, next) => {
    const { CoursePreviewLeadController } = req.container.cradle
    CoursePreviewLeadController.start(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

router.post(
  '/finish',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('COURSE_PREVIEW_LEAD_FINISH', req, res, next)
  },
  (req, res, next) => {
    const { CoursePreviewLeadController } = req.container.cradle
    CoursePreviewLeadController.finish(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
