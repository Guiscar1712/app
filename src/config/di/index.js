const { createContainer } = require('awilix')

/* modules */
const logger = require('./modules/logger')
const user = require('./modules/user')
const contract = require('./modules/contract')
const middlewares = require('./modules/middlewares')

const clients = require('./modules/clients')

const container = createContainer()

container.register(logger)
container.register(middlewares)
container.register(user)
container.register(clients)
container.register(contract)

module.exports = container
module.exports.cradle = container.cradle
