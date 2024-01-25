const express = require('express')
const router = express.Router()

router.post(
  '/recovery/update',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('AUTH_UPDATE', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to request authentication token' */

    /*  #swagger.security = [{ "token": [] }]  */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Auth Request information.',
            required: true,
            schema: { "email": "heitor.fernandes@bluecore.com.br" }
    } */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
                  "data": {
                    "id": 1286,
                    "email": "heitor.fernandes@bluecore.com.br" }},
        description: "Login successfully" } */
    const { AuthController } = req.container.cradle
    AuthController.update(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
