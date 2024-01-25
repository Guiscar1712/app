const express = require('express')
const router = express.Router()

router.post(
  '/login',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('AUTH_LOGIN', req, res, next)
  },
  (req, res, next) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to request authentication token' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Auth Request information.',
            required: true,
            schema: { $provider:"verification-code", $userId:12, $token:"12345" }
    } */

    /*  #swagger.responses[200] = { 
        schema: {	success: true,
                data: { "success": true,
	                      "data": {
                          "token": "eyJhCI6IkpXVCJ9.eyJpZBfkXFNptXQdxJk",
		                      "email": "heitor.fernandes@bluecore.com.br"}}},
        description: "Login successfully" } */

    const { AuthController } = req.container.cradle
    AuthController.login(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
