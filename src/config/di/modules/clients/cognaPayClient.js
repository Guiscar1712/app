const { asClass } = require('awilix')

const CognaPayClient = require('../../../../clients/cognapay/index')
const CognaPayGetToken = require('../../../../clients/cognapay/token')
const CognaPayPaymentPix = require('../../../../clients/cognapay/pix')
const CognaPayPaymentPixStatus = require('../../../../clients/cognapay/paymentStatus')

module.exports = {
  CognaPayGetToken: asClass(CognaPayGetToken),
  CognaPayPaymentPix: asClass(CognaPayPaymentPix),
  CognaPayPaymentPixStatus: asClass(CognaPayPaymentPixStatus),
  CognaPayClient: asClass(CognaPayClient),
}
