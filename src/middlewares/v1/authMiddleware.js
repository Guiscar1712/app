const config = require('../../utils/config')
const jwt = require('jsonwebtoken')

module.exports = class AuthMiddleware {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  isAuthenticated = async (req, res, next) => {
    const step = this.LoggerService.addStep('AuthMiddlewareIsAuthenticated')
    try {
      this.getUserAuthenticated(req)
        .then((decoded) => {
          req.user = decoded
          this.LoggerService.setIndex({
            userId: decoded.id,
            email: decoded.email,
            document: decoded.cpf,
          })
          step.value.addData({ isAuthenticated: true, decoded })
          next()
        })
        .catch((err) => {
          step.value.addData({ isAuthenticated: false, err })
          res.status(401).send(err)
        })
    } catch (error) {
      next(error)
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  isLocalhost = (req, res, next) => {
    if (
      req.connection.remoteAddress === '::ffff:127.0.0.1' ||
      req.connection.remoteAddress === '::1'
    ) {
      next()
    }
  }

  getUserAuthenticated(req) {
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
}
