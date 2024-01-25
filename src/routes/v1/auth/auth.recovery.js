const express = require('express')
const router = express.Router()

router.post(
  '/recovery',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('AUTH_RECOVERY', req, res, next)
  },
  (req, res, next) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to request authentication token' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Auth Request information.',
            required: true,
            schema: {
              "userId": "1286",
              "document": "43100360826",
              "birthday": "1993-02-11T00:00:00",
              "name": "MAYARA REGINA SILVEIRA GOIS",
              "motherName": "MARIA AMELIA DA SILVEIRA GOIS" }
    } */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
                  "data": {
                    "token": "eyJhbGciOiJIUzI1J9.eyJ6gAn6I6NsRx6MPyKdAeTAiyeuEC-I4jE",
                    "email": "heitor.fernandes@bluecore.com.br" }},
        description: "Login successfully" } */
    const { AuthController } = req.container.cradle
    AuthController.recovery(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
