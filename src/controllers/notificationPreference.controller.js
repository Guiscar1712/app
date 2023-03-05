const NotificationPreferenceService = require('../services/notificationPreference.service')

module.exports = class NotificationPreferenceController {
  static async get (request, response, next) {
    try {
      const data = await NotificationPreferenceService.list(request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async insert (request, response, next) {
    try {
      const data = await NotificationPreferenceService.insert(request.body, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async delete (request, response, next) {
    try {
      const data = await NotificationPreferenceService.delete(request.params.id, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
