const { asClass } = require('awilix')

const FirebaseClient = require('../../../../clients/firebase')
const SendGridClient = require('../../../../clients/sendgrid')

module.exports = {
  FirebaseClient: asClass(FirebaseClient).scoped(),
  SendGridClient: asClass(SendGridClient).scoped()
}
