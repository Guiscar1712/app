const express = require('express')
const router = express.Router()

router.post(
  '/start/:subscriptionKey',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('ADMISSION_TEST_BEGIN', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['Exam']
        #swagger.description = 'Endpoint to sign in a specific Exam' */

    /*  #swagger.parameters['subscriptionKey'] = {
            in: 'path',
            description: 'Exam information.',
            required: true
    } */

    /*  #swagger.security = [{ "token": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
	                "data": {
                    "description":"A partir das suas experiências, tanto profissionais quanto pessoais. Tema: O que você espera da sua carreira?", 
                    "id":1532}},
        description: "Validate successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { ExamController } = req.container.cradle
    ExamController.start(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
