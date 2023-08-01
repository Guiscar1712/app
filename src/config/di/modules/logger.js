const { asClass } = require('awilix')

const LoggerService = require('../../../services/logger')

module.exports = {
  LoggerService: asClass(LoggerService).scoped()
}
