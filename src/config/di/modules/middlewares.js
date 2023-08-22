const { asClass } = require('awilix')
const TrackMiddleware = require('../../../middlewares/v1/trackMiddleware')
const AuthMiddleware = require('../../../middlewares/v1/authMiddleware')
const ResponseMiddleware = require('../../../middlewares/v1/ResponseHandler')

module.exports = {
  TrackMiddleware: asClass(TrackMiddleware).scoped(),
  AuthMiddleware: asClass(AuthMiddleware).scoped(),
  ResponseMiddleware: asClass(ResponseMiddleware).scoped()
}
