const NotificationService = require('../services/notification.service')

module.exports = class NotificationPreferenceController {
  static async get (request, response, next) {
    try {
      const data = await NotificationService.list(request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getById (request, response, next) {
    try {
      const data = await NotificationService.getById(request.params.id, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async insert (request, response, next) {
    try {
      const { Title, Content, NotificationId } = request.body

      const data = await NotificationService.insert(Title, Content, NotificationId, request.user.id)

      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async notificationRead (request, response, next) {
    try {
      const data = await NotificationService.notificationRead(request.params.id, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async notificationAllRead (request, response, next) {
    try {
      const data = await NotificationService.notificationAllRead(request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async notificationNotRead (request, response, next) {
    try {
      const data = await NotificationService.notificationNotRead(request.params.id, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async delete (request, response, next) {
    try {
      const data = await NotificationService.delete(request.params.id, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
