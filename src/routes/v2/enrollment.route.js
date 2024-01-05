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

router.get(
  '/:idOrigin/details',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('ENROLLMENTS_DETAILS', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['Enrollment']
        #swagger.description = 'Endpoint to sign in a specific Enrollment' */

    /*  #swagger.parameters['idOrigin'] = {
            in: 'path',
            description: 'Enrollment information.',
            required: true
    } */

    /*  #swagger.security = [{ "bearerAuth": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
	                "data": {
	                	"idOrigin": 1909524,
	                	"businessKey": "CPF_83822621048_OFFER_SRC_KROTON_29a92f7d979a9ba43a9b48408d8061e3_15074652_0ac9a9eb0b4c0af7e1cabcf1841d1884_1_NOTURNO_8_TIMESTAMP_1701087807",
	                	"enrollmentDate": "2023-11-27T12:23:27",
	                	"enem": {
	                		"active": false,
	                		"approved": false
	                	},
	                	"courseTypeName": "BACHARELADO",
	                	"unit": "SAO PAULO/SP - XXV(15074652)A",
	                	"modality": "EAD",
	                	"shift": "NOTURNO",
	                	"monthlyPayment": 179,
	                	"courseName": "Ciência da Computação",
	                	"studentEnrollment": {
	                		"enrollmentId": 3716011101,
	                		"studentCode": "37160111",
	                		"studentName": "FELIPE SUSSA",
	                		"studentEmail": "Sadasd@sasd.com",
	                		"studentDocument": "838.226.210-48",
	                		"payment": true,
	                		"active": true
	                	},
	                	"contract": {
	                		"available": false,
	                		"accepted": false,
	                		"incomplete": null,
	                		"incompleteLink": null
	                	},
	                	"classification": "ABSENT",
	                	"paymentConfig": {
	                		"pix": {
	                			"enabled": true
	                		}
	                	},
	                	"admissionsTest": {
	                		"finishedOnline": true,
	                		"eligible": "DONE"}}},
        description: "Successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { EnrollmentsController } = req.container.cradle
    EnrollmentsController.getDetailsV2(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
