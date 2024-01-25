const express = require('express')
const router = express.Router()

router.post(
  '/validate',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('AUTH_VALIDATE', req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to sign in a specific Auth' */

    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Auth Request information.',
            required: true,
            schema: { $document:"30605507007" }
    } */

    /*  #swagger.responses[200] = { 
        schema: {	success: true,
                data: {userId: 51088,
                       name: "Mayara Silveira Gois",
                      providers: [{
                            provider: "verification-code",
                            receiver: "email",
                            identifier: "may***rsgg@gma***com"}]}},
        description: "Validate successfully" } */

    const { AuthController } = req.container.cradle
    AuthController.validate(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
