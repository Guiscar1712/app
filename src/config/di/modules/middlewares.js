const { asClass } = require('awilix')
const TrackMiddleware = require('../../../middlewares/v1/trackMiddleware')
const AuthMiddleware = require('../../../middlewares/v1/authMiddleware')
const ResponseMiddleware = require('../../../middlewares/v1/ResponseHandler')

module.exports = {
  TrackMiddleware: asClass(TrackMiddleware),
  AuthMiddleware: asClass(AuthMiddleware),
  ResponseMiddleware: asClass(ResponseMiddleware),
}
