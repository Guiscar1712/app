const { asClass } = require('awilix')

const PaymentRepository = require('../../../repositories/v1/PaymentRepository')

const PaymentService = require('../../../services/payment/index')
const PaymentPixService = require('../../../services/payment/paymentPix')
const PaymentPixSaveService = require('../../../services/payment/paymentPixSave')
const PaymentPixStatusService = require('../../../services/payment/paymentPixStatus')
const PaymentPixUpdateService = require('../../../services/payment/paymentPixUpdate')

const PaymentController = require('../../../controllers/v1/payment.controller')

module.exports = {
  PaymentController: asClass(PaymentController),
  PaymentService: asClass(PaymentService),
  PaymentPixService: asClass(PaymentPixService),
  PaymentPixSaveService: asClass(PaymentPixSaveService),
  PaymentPixStatusService: asClass(PaymentPixStatusService),
  PaymentPixUpdateService: asClass(PaymentPixUpdateService),
  PaymentRepository: asClass(PaymentRepository),
}
