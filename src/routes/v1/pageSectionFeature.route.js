const express = require('express')
const router = express.Router()

router.get(
  '/page/:page',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('SETTINGS_PAGE', req, res, next)
  },
  (req, res, next) => {
    const { SettingsController } = req.container.cradle
    SettingsController.getPage(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

router.get(
  '/page',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('SETTINGS_PAGES', req, res, next)
  },
  (req, res, next) => {
    const { SettingsController } = req.container.cradle
    SettingsController.getPages(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
