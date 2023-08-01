const { asClass } = require('awilix')

const ErrorMiddleware = require('../../../middlewares/errorHandler.di')

module.exports = {
  ErrorMiddleware: asClass(ErrorMiddleware).scoped()
}
