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

    /*  #swagger.security = [{ "bearerAuth": [] }]  */

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

router.post(
  '/finalize/:subscriptionKey',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('ADMISSION_TEST_FINISH', req, res, next)
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

    /*  #swagger.security = [{ "bearerAuth": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
	                "data": {
                    "duration":1571,
                    "eligible":"DONE",
                    "endDate":"2024-01-09T06:51:31.986",
                    "finishedOnline":true,
                    "maxAttempts":10,
                    "numberAttempts":2,
                    "startDate":"2024-01-08T04:41:17.824"}},
        description: "Validate successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { ExamController } = req.container.cradle
    ExamController.finalize(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
