const { asClass } = require('awilix')
const ResponseMiddleware = require('../../../middlewares/ResponseHandler')

module.exports = {
  ResponseMiddleware: asClass(ResponseMiddleware).scoped()
}
