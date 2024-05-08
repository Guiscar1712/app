const { asClass } = require('awilix')

const MembershipRepository = require('../../../repositories/v1/membershipRepository')
const UserRepository = require('../../../repositories/v1/userRepository')
const UserFirebaseRepository = require('../../../repositories/v1/userFirebaseRepository')
const UserService = require('../../../services/user')
const UserHelpers = require('../../../helpers/user')
const UserHelpersRegisterValidation = require('../../../helpers/user/registerValidation')
const UserController = require('../../../controllers/v1/user.controller')

module.exports = {
  MembershipRepository: asClass(MembershipRepository),
  UserRepository: asClass(UserRepository),
  UserFirebaseRepository: asClass(UserFirebaseRepository),
  UserService: asClass(UserService),
  UserHelpers: asClass(UserHelpers),
  UserHelpersRegisterValidation: asClass(UserHelpersRegisterValidation),
  UserController: asClass(UserController),
}
