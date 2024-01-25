const express = require('express')
const router = express.Router()

router.post(
  '/:provider/request',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('AUTH_VERIFICATION_CODE_REQUEST', req, res, next)
  },
  (req, res, next) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to request verification code' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Auth Request information.',
            required: true,
            schema: { $receiver:"email", $userId:12 }
    } */

    /*  #swagger.responses[200] = { 
        schema: {	success: true,
                data: { success: true,
	                      data: { provider: "verification-code",
                          receiver: "email",
                          identifier: "may***rsgg@gma***com" }}},
        description: "Provider Request successfully" } */

    const { AuthController } = req.container.cradle
    AuthController.request(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
