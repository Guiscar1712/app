const { asClass } = require('awilix')

const AuthValidatorService = require('../../../services/auth/validator')
const AuthRequestService = require('../../../services/auth/request')
const AuthLoginService = require('../../../services/auth/login')
const AuthService = require('../../../services/auth')
const AuthController = require('../../../controllers/v1/auth.controller')

module.exports = {
  AuthValidatorService: asClass(AuthValidatorService),
  AuthRequestService: asClass(AuthRequestService),
  AuthLoginService: asClass(AuthLoginService),
  AuthService: asClass(AuthService),
  AuthController: asClass(AuthController),
}
