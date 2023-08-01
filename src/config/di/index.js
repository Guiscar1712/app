const { createContainer } = require('awilix')

/* modules */
const logger = require('./modules/logger')
const user = require('./modules/user')

const container = createContainer()

container.register(logger)
container.register(user)

module.exports = container
module.exports.cradle = container.cradle
