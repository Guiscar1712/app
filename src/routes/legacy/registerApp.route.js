const express = require('express')
const router = express.Router()

const RegisterAppController = require('../../controllers/registerApp.controller')

const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.post(
  '/',
  TrackMiddleware.tracking,
  AuthMiddleware.isAuthenticated,
  RegisterAppController.register
  // #swagger.tags = ['Register App']
  /*  #swagger.security = [{ "token": [] }]  */
  /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Register App information.',
            required: true,
            schema: {	"token": "dDhF11:APA94_ytkMpbz-_Cfr349Xys-opKiUvO_aIeWkfj"
          }} */
)

module.exports = router
