const { createContainer } = require('awilix')

/* modules */
const logger = require('./modules/logger')
const user = require('./modules/user')
const exception = require('./modules/exception')

const clients = require('./modules/clients')

const container = createContainer()

container.register(logger)
container.register(exception)
container.register(user)
container.register(clients)

module.exports = container
module.exports.cradle = container.cradle
