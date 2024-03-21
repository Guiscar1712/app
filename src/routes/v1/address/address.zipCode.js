const express = require('express')
const router = express.Router()

router.post(
  '/:zipcode',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('ADDRESS_GET', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['Address']
        #swagger.description = 'Endpoint to sign in a specific Address' */

    /*  #swagger.parameters['zipcode'] = {
            in: 'path',
            description: 'Address information.',
            required: true
    } */

    /*  #swagger.security = [{ "token": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: {
	"success": true,
	"data": {
		"cep": "03303000",
		"state": "SP",
		"city": "São Paulo",
		"neighborhood": "Quarta Parada",
		"street": "Rua Padre Adelino",
		"service": "viacep"
	}
},
        description: "Successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */

    const { AddressController } = req.container.cradle
    AddressController.addressByZipCode(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
