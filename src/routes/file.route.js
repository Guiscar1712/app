const express = require('express')
const router = express.Router()

const FileController = require('../controllers/file.controller')
const TrackMiddleware = require('../middlewares/trackMiddleware')

router.post('/upload', TrackMiddleware.tracking, FileController.upload)

module.exports = router
