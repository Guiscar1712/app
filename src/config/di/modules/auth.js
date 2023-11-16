const { asClass } = require('awilix')


const AuthService = require('../../../services/auth')
const AuthController = require('../../../controllers/v1/auth.controller')

module.exports = {  
  AuthService: asClass(AuthService),
  AuthController: asClass(AuthController),
}
