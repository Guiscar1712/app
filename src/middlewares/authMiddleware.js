const config = require('../utils/config')
const jwt = require('jsonwebtoken')

module.exports = class AuthMiddleware {
  static async isAuthenticated (req, res, next) {
    try {
      getUserAuthenticated(req)
        .then(decoded => {
          req.user = decoded
          next()
        })
        .catch(err => {
          res.status(401).send(err)
        })
    } catch (error) {
      next(error)
    }
  }

  static isLocalhost (req, res, next) {
    if (
      req.connection.remoteAddress === '::ffff:127.0.0.1' ||
      req.connection.remoteAddress === '::1'
    ) {
      next()
    }
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
