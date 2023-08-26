const config = require('../../utils/config')
const jwt = require('jsonwebtoken')

module.exports = class AuthMiddleware {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  isAuthenticated = async (req, res, next) => {
    const step = this.LoggerService.addStep('AuthMiddlewareIsAuthenticated')
    try {
      getUserAuthenticated(req)
        .then(decoded => {
          req.user = decoded
          this.LoggerService.setIndex({ userId: decoded.id, email: decoded.email })
          step.finalize({ isAuthenticated: true, decoded })
          next()
        })
        .catch(err => {
          step.finalize({ isAuthenticated: false, err })
          res.status(401).send(err)
        })
    } catch (error) {
      step.finalize(error)
      next(error)
    }
  }

  isLocalhost = (req, res, next) => {
    const step = this.LoggerService.addStep('AuthMiddlewareIsLocalhost')
    if (
      req.connection.remoteAddress === '::ffff:127.0.0.1' ||
      req.connection.remoteAddress === '::1'
    ) {
      step.finalize({ localhost: true })
      next()
    } else { step.finalize({ localhost: false }) }
  }
}

function getUserAuthenticated (req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.headers.token, config.jwtSecret, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}
