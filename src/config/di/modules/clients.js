const { asClass } = require('awilix')

const FirebaseClient = require('../../../clients/firebase')

module.exports = {
  FirebaseClient: asClass(FirebaseClient).scoped()
}
