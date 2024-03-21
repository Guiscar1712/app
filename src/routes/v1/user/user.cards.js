const express = require('express')
const router = express.Router()

router.get(
  '/student-cards',
  (req, res, next) => {
    const { TrackMiddleware } = req.container.cradle
    TrackMiddleware.tracking('USER_STUDENT_CARDS', req, res, next)
  },
  (req, res, next) => {
    const { AuthMiddleware } = req.container.cradle
    AuthMiddleware.isAuthenticated(req, res, next)
  },
  (req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific User' */

    /*  #swagger.security = [{ "token": [] }]  */

    /*  #swagger.responses[200] = { 
        schema: { "success": true,
	                "data": [{
	                          	"code": "36645073",
	                          	"name": "ELIENE RIBEIRO SOUZA",
	                          	"email": "lyusorriso@yahoo.com.br",
	                          	"document": "014.523.835-02",
	                          	"birthday": "1984-05-28",
	                          	"institution": "Anhanguera Educacional",
	                          	"expirationDate": "6/2024",
	                          	"courseName": "Enfermagem"
	                          }]},
        description: "Successfully" } */

    /*  #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/response401" },
        description: "Unathorized" } */
    const { UserController } = req.container.cradle
    UserController.getStudentCards(req, res, next)
  },
  (data, req, res, next) => {
    const { ResponseMiddleware } = req.container.cradle
    ResponseMiddleware.Handler(data, req, res, next)
  }
)

module.exports = router
