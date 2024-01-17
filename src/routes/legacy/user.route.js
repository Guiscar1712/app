const express = require('express')
const router = express.Router()

const UserController = require('../../controllers/user.controller')

const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.post(
  '/register',
  TrackMiddleware.tracking,
  UserController.register
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)
router.post(
  '/login',
  TrackMiddleware.tracking,
  UserController.login
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)
router.post(
  '/login-firebase',
  TrackMiddleware.tracking,
  UserController.loginFirebase
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)
router.post(
  '/validate',
  TrackMiddleware.tracking,
  UserController.validateCode
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)

router.post(
  '/changePassword',
  TrackMiddleware.tracking,
  UserController.changePassword
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)
router.post(
  '/recoverPassword',
  TrackMiddleware.tracking,
  UserController.recoverPassword
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)

router.post(
  '/getRecoveryKey',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  UserController.getRecoveryKey
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)

router.put(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.update
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)
router.post(
  '/photo',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.photo
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)

router.get(
  '/me',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.getMe
  // #swagger.tags = ['User']

  /*  #swagger.security = [{ "token": [] }]  */

  /*  #swagger.responses[200] = { 
      schema: {
        "id": 1286,
	      "createdAt": "2023-12-13T00:00:00.000Z",
	      "name": "Nome completo",
	      "email": "nomedeemail@email.com.br",
	      "cpf": "43100360826",
	      "phone": "11939999999",
	      "gender": "F",
	      "birthday": "09/02/1993",
	      "photo": null,
	      "city": "Sorocaba",
	      "address": "Rua Demercindo Alves da Silva",
	      "number": "450",
	      "complement": null,
	      "notifyFreeCourses": true,
	      "notifyEvents": true,
	      "notifyPromotions": true,
	      "alertWarnings": true,
	      "alertTeatchers": true,
	      "zipcode": "18016085",
	      "state": "SP"
      },
      description: "get successfully" } */
)
router.get(
  '/:id',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.get
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)
router.get(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isLocalhost,
  UserController.list
  // #swagger.ignore = true
)

router.delete(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  UserController.delete
  // #swagger.tags = ['User']
  // #swagger.deprecated = true
)

module.exports = router
