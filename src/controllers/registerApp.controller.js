const RegisterAppService = require('../services/registerApp.service')

module.exports = class NotificationPreferenceController {
  static async register(request, response, next) {
    try {
      const data = await RegisterAppService.register(
        request.body,
        request.user.id
      )
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
