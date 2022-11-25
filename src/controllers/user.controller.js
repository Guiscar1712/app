const jwt = require('jsonwebtoken')
const UserService = require('../services/userService')

const SECRET = process.env.JWT_SECRET

module.exports = class UserController {
  /*static async login (request, response, next) {
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
          response.json(decoded)
        } else {
          response.status(401).send('Invalid token')
        }
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  

  

  */
  static async get (request, response, next) {
    try {
      const data = await UserService.findById(request.params.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async list (request, response, next) {
    try {
      const data = await UserService.list()
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async register(request, response, next){
    try{
      const data = await UserService.register(request.body);
      response.json(data)
    }catch(error){
      console.log(error)
      next(error)
    }
  }

  static async login(request, response, next){
    try{
      const { email, password } = request.body
      const data = await UserService.login(email, password);
      response.json(data)
    }catch(error){
      console.log(error);
      next(error)
    }
  }

  /*static async save(request, response, next){
    try{
      const data = await UserService.save(request.body);
      response.json(data)
    }catch(error){
      console.log(error)
      next(error)
    }
  }*/
}
