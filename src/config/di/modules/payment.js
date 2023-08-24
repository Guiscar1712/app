const { asClass } = require('awilix')

// const MembershipRepository = require('../../../repositories/v1/membershipRepository')
// const UserRepository = require('../../../repositories/v1/userRepository')
// const UserFirebaseRepository = require('../../../repositories/v1/userFirebaseRepository')
const PaymentService = require('../../../services/payment')
const PaymentController = require('../../../controllers/v1/payment.controller')

module.exports = {
  PaymentController: asClass(PaymentController).scoped(),
  PaymentService: asClass(PaymentService).scoped()
}
