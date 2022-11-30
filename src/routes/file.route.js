const express = require('express')
const router = express.Router()

const FileController = require('../controllers/file.controller')

router.post('/upload', FileController.upload)

module.exports = router
