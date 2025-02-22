const { createContainer } = require('awilix')

/* modules */
const logger = require('./modules/logger')
const user = require('./modules/user')
const auth = require('./modules/auth')
const contract = require('./modules/contract')
const enrollments = require('./modules/enrollments')
const payment = require('./modules/payment')
const middlewares = require('./modules/middlewares')
const exam = require('./modules/exam')
const registerApp = require('./modules/registerApp')

const coursePreviewLead = require('./modules/coursePreviewLead')
const notification = require('./modules/notification')
const settings = require('./modules/settings')

const address = require('./modules/address')
const clients = require('./modules/clients')
const cognaPayClient = require('./modules/clients/cognaPayClient')
const ingressoClient = require('./modules/clients/ingressoClient')

const container = createContainer()

container.register(logger)
container.register(middlewares)
container.register(user)
container.register(auth)
container.register(enrollments)
container.register(exam)
container.register(registerApp)
container.register(coursePreviewLead)
container.register(settings)
container.register(payment)
container.register(notification)

container.register(address)
container.register(clients)
container.register(contract)
container.register(cognaPayClient)
container.register(ingressoClient)

module.exports = container
