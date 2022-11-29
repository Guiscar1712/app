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
      if(error){
        if(error.response &&  error.response.body && error.response.body.errors){
          console.log(error.response.body.errors)
        }
        else{
          console.log(error);
        }
      }
      
      
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

  static async update(request, response, next){
    try{
      const data = await UserService.update(request.body);
      response.json(data)
    }catch(error){
      console.log(error)
      next(error)
    }
  }

  static async validateCode(request, response, next){
    try{
      const { email, code } = request.body
      const data = await UserService.validateCode(email, code);
      response.json(data)
    }catch(error){
      console.log(error)
      next(error)
    }
  }

  static async changePassword(request, response, next){
    try{
      const { email, code, password } = request.body
      const data = await UserService.changePassword(email, code, password);
      response.json(data)
    }catch(error){
      console.log(error)
      next(error)
    }
  }

  static async recoverPassword(request, response, next){
    try{
      const { cpf } = request.body
      const data = await UserService.recoverPassword(cpf);
      response.json(data)
    }catch(error){
      console.log(error)
      next(error)
    }
  } 
}
