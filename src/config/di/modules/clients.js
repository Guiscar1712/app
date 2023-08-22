const { asClass } = require('awilix')

const FirebaseClient = require('../../../clients/firebase')
const SendGridClient = require('../../../clients/sendgrid')
const IngressoClient = require('../../../clients/ingresso/ingresso')

module.exports = {
  FirebaseClient: asClass(FirebaseClient).scoped(),
  SendGridClient: asClass(SendGridClient).scoped(),
  IngressoClient: asClass(IngressoClient).scoped()
}
