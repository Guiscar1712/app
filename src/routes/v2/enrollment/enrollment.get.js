const express = require('express')
const router = express.Router()

router.get(
  '/:document',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('ENROLLMENTS_LIST', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['Enrollment']
        #swagger.description = 'Endpoint to sign in a specific Enrollment' */

    /*  #swagger.parameters['document'] = {
            in: 'path',
            description: 'Enrollment information.',
            required: true
    } */

    /*  #swagger.security = [{ "bearerAuth": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
	                "data": [
	                	{
	                		"idOrigin": 234523,
	                		"businessKey": "CPF_06780053601_OFFER_SRC_KROTON_b732d",
	                		"enrollmentDate": "2023-01-16T14:11:58",
	                		"enem": {
	                			"active": false,
	                			"approved": false
	                		},
	                		"courseTypeName": "Bacharelado",
	                		"unit": "CAMPO BELO/MG - I(11088903)U",
	                		"modality": "A distância",
	                		"shift": "Noite",
	                		"monthlyPayment": 189,
	                		"courseName": "Administração",
	                		"studentEnrollment": {
	                			"enrollmentId": 45654645,
	                			"studentCode": "456454",
	                			"studentName": "Marinalva Joana",
	                			"studentEmail": "aljoana@gmail.com",
	                			"studentDocument": "067.800.536-01",
	                			"payment": true,
	                			"active": true
	                		},
	                		"classification": "STUDENT",
	                		"paymentConfig": {
	                			"pix": {
	                				"enabled": true
	                			}}}]},
        description: "Successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { EnrollmentsController } = req.container.cradle
    EnrollmentsController.getList(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
