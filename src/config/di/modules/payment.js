const { asClass } = require('awilix')

const PaymentRepository = require('../../../repositories/v1/PaymentRepository')

const PaymentService = require('../../../services/payment/index')
const PaymentPixService = require('../../../services/payment/paymentPix')
const PaymentPixSaveService = require('../../../services/payment/paymentPixSave')
const PaymentPixStatusService = require('../../../services/payment/paymentPixStatus')
const PaymentPixUpdateService = require('../../../services/payment/paymentPixUpdate')

const PaymentController = require('../../../controllers/v1/payment.controller')

module.exports = {
  PaymentController: asClass(PaymentController).scoped(),
  PaymentService: asClass(PaymentService).scoped(),
  PaymentPixService: asClass(PaymentPixService).scoped(),
  PaymentPixSaveService: asClass(PaymentPixSaveService).scoped(),
  PaymentPixStatusService: asClass(PaymentPixStatusService).scoped(),
  PaymentPixUpdateService: asClass(PaymentPixUpdateService).scoped(),
  PaymentRepository: asClass(PaymentRepository).scoped()
}
