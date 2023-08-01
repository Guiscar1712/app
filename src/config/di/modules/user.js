const { asClass } = require('awilix')

const MembershipRepository = require('../../../repositories/v1/membershipRepository')
const UserRepository = require('../../../repositories/v1/userRepository')
const UserService = require('../../../services/user')
const UserController = require('../../../controllers/v1/user.controller')

module.exports = {
  MembershipRepository: asClass(MembershipRepository).scoped(),
  UserRepository: asClass(UserRepository).scoped(),
  UserService: asClass(UserService).scoped(),
  UserController: asClass(UserController).scoped()
}
