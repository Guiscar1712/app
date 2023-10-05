const { asClass, asFunction } = require('awilix')

const LoggerService = require('../../../services/logger')

function initLogger({ createScopedLogger }) {
  return createScopedLogger()
}

module.exports = {
  LoggerService: asClass(LoggerService).scoped(),
  createScopedLogger: asFunction(() => {
    return () => new LoggerService()
  }),
  initLogger: asFunction(initLogger).scoped(),
}
