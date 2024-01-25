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
  // #swagger.tags = ['User']

  /*  #swagger.parameters['cep'] = {
            in: 'path',
            description: 'CEP',
            required: true
    } */

  /*  #swagger.security = [{ "token": [] }]  */

  /*  #swagger.responses[200] = { 
      schema: {	"cep": "13173433",
              	"state": "SP",
              	"city": "Sumaré",
              	"neighborhood": "Residencial Bordon",
              	"street": "Rua Euclydes Valentim Cestari",
              	"service": "correios"
              },
      description: "get successfully" } */
)

module.exports = router
