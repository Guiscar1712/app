const express = require('express')
const router = express.Router()

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
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific User' */

    /*  #swagger.parameters['cpf'] = {
            in: 'path',
            description: 'User information.',
            required: true
    } */

    /*  #swagger.security = [{ "bearerAuth": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: {  $ref: "#/definitions/personalDataResponse" },
        description: "Validate successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { UserController } = req.container.cradle
    UserController.personalDataGet(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
