const moment = require('moment')
const registerAppRepository = require('../repositories/RegisterAppRepository')

module.exports = class RegisterApp {
  static async list (UserId) {
    return await registerAppRepository.listByUserId({ UserId })
  }

  static async register (model, UserId) {
    const { token } = model

    const hasRegistration = await RegisterApp.Validate(token, UserId)

    if (hasRegistration) {
      const UpdatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      return await registerAppRepository.update(hasRegistration, UserId, UpdatedAt)
    }

    return await registerAppRepository.insert({ token, UserId })
  }

  static async Validate (token, UserId) {
    if (!token) {
      throw new Error('Token é obrigatório!')
    }

    const register = await registerAppRepository.findBy({ token, UserId })

    return register?.id
  }

  static async delete (id, UserId) {
    return await registerAppRepository.deleteBy({ id, UserId })
  }
}
