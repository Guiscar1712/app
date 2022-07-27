const jwt = require('jsonwebtoken')
const UserDatabase = require('../database/user.database')

const SECRET = process.env.JWT_SECRET

module.exports = class UserController {
  static async login (request, response, next) {
    try {
      const { username, password } = request.body

      const user = await UserDatabase.findByLogin(username, password)
      if (user) {
        const token = jwt.sign(user, SECRET)

        response.status(200).send(token)
      } else {
        response.status(401).send('Invalid username or password')
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static isAuthenticated (request, response, next) {
    try {
      const token = request.headers.token

      jwt.verify(token, SECRET, (error, decoded) => {
        if (!error) {
          return response.json(decoded)
        } else {
          return response.status(401).send('Invalid token')
        }
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async list (request, response, next) {
    try {
      const users = await UserDatabase.list()
      return response.json(users)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
