const UserService = require('../services/user.service')

module.exports = class UserController {
  static async get (request, response, next) {
    try {
      const data = await UserService.findById(request.params.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getMe (request, response, next) {
    try {
      const data = await UserService.findById(request.user.id)
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

  static async register (request, response, next) {
    try {
      const data = await UserService.register(request.body)
      response.json(data)
    } catch (error) {
      if (error) {
        if (
          error.response &&
          error.response.body &&
          error.response.body.errors
        ) {
          console.log(error.response.body.errors)
        } else {
          console.log(error)
        }
      }

      next(error)
    }
  }

  static async login (request, response, next) {
    try {
      const { email, password } = request.body
      const data = await UserService.login(email, password)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async loginFirebase (request, response, next) {
    try {
      const { token } = request.headers
      const data = await UserService.loginFirebase(token)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async update (request, response, next) {
    try {
      const data = await UserService.update(request.user.id, request.body)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getRecoveryKey (request, response, next) {
    try {
      const { email } = request.body
      const data = await UserService.getRecovery(email)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async validateCode (request, response, next) {
    try {
      const { email, code } = request.body
      const data = await UserService.validateCode(email, code)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async changePassword (request, response, next) {
    try {
      const { email, code, password } = request.body
      const data = await UserService.changePassword(email, code, password)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async recoverPassword (request, response, next) {
    try {
      const { cpf } = request.body
      const data = await UserService.recoverPassword(cpf)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async delete (request, response, next) {
    try {
      const data = await UserService.delete(request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async photo (request, response, next) {
    try {
      const { base64 } = request.body
      const data = await UserService.photo(request.user.id, base64)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
      // response.status(400).json({ success: false })
    }
  }
}
