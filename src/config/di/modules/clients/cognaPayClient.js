const { asClass } = require('awilix')

const CognaPayClient = require('../../../../clients/cognapay/index')
const CognaPayGetToken = require('../../../../clients/cognapay/token')
const CognaPayPaymentPix = require('../../../../clients/cognapay/pix')
const CognaPayPaymentPixStatus = require('../../../../clients/cognapay/paymentStatus')

module.exports = {
  CognaPayGetToken: asClass(CognaPayGetToken).scoped(),
  CognaPayPaymentPix: asClass(CognaPayPaymentPix).scoped(),
  CognaPayPaymentPixStatus: asClass(CognaPayPaymentPixStatus).scoped(),
  CognaPayClient: asClass(CognaPayClient).scoped()
}
