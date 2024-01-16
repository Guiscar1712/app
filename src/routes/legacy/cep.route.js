const express = require('express')
const router = express.Router()

const CepController = require('../../controllers/cep.controller')
const TrackMiddleware = require('../../middlewares/trackMiddleware')
const AuthMiddleware = require('../../middlewares/authMiddleware')

router.get(
  '/:cep',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  CepController.getInfoAddressByCep
)

module.exports = router
