const express = require('express')
const router = express.Router()

router.get(
  '/:contractId',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('CONTRACT_DETAIL', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['Contract']
        #swagger.description = 'Endpoint to sign in a specific Contract' */

    /*  #swagger.parameters['contractId'] = {
            in: 'path',
            description: 'Contract information.',
            required: true
    } */

    /*  #swagger.security = [{ "token": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
	                "data": [{
			              "id": "645bf02d9f5aeb1f7ab7ec62",
			              "name": "Prestação de serviço",
			              "accepted": false}]},
        description: "Validate successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */

    const { ContractController } = req.container.cradle
    ContractController.getByContractId(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
