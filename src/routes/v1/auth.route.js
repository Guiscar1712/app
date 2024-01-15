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

router.post(
  '/register',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('AUTH_REGISTER', req, res, next)
  },
  (req, res, next) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to sign in a specific Auth' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Auth Request information.',
            required: true,
            schema: { $document:"30605507007", $name:"Nome Completo", $email:"emaildousuarii@valido.com", $phone:"11987651234", $optin: true }
    } */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
                  "data": {
                    "id": 49483,
                    "document": "46587175066",
                    "name": "Heitor F Neto",
                    "email": "heitorfnetobr17@hotmail.com",
                    "phone": "5518985698511",
                    "optin": true }},
        description: "Login successfully" } */

    const { AuthController } = req.container.cradle
    AuthController.register(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

router.post(
  '/recovery',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('AUTH_RECOVERY', req, res, next)
  },
  (req, res, next) => {
    const { AuthController } = req.container.cradle
    AuthController.recovery(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

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
    const { AuthController } = req.container.cradle
    AuthController.update(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
