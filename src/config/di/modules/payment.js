const { asClass } = require('awilix')

// const MembershipRepository = require('../../../repositories/v1/membershipRepository')
// const UserRepository = require('../../../repositories/v1/userRepository')
// const UserFirebaseRepository = require('../../../repositories/v1/userFirebaseRepository')
// const UserService = require('../../../services/user')
const PaymentController = require('../../../controllers/v1/payment.controller')

module.exports = {
  PaymentController: asClass(PaymentController).scoped()
}
