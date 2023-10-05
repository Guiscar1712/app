const { asClass } = require('awilix')

const MembershipRepository = require('../../../repositories/v1/membershipRepository')
const UserRepository = require('../../../repositories/v1/userRepository')
const UserFirebaseRepository = require('../../../repositories/v1/userFirebaseRepository')
const UserService = require('../../../services/user')
const UserController = require('../../../controllers/v1/user.controller')

module.exports = {
  MembershipRepository: asClass(MembershipRepository),
  UserRepository: asClass(UserRepository),
  UserFirebaseRepository: asClass(UserFirebaseRepository),
  UserService: asClass(UserService),
  UserController: asClass(UserController),
}
