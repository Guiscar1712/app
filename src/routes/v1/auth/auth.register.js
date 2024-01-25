const express = require('express')
const router = express.Router()

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

module.exports = router
