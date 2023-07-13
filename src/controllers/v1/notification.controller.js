const { ValidationError, ClientServerError } = require('../../utils/errors')
const { notificationSave, notificationList, notificationById } = require('./../../services/notification')

module.exports = class NotificationController {
  static async save (request, response, next) {
    try {
      const { title, content, notificationId, data } = request.body

      if (!title || !content) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }

      const notification = await notificationSave(title, content, notificationId, data, request.user.id)
      if (notification && notification.Title) {
        return response.status(201).json(notification)
      }
      throw new ClientServerError('Something went wrong', notification)
    } catch (error) {
      next(error)
    }
  }

  static async get (request, response, next) {
    try {
      const data = await notificationList(request.user.id)
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async getById (request, response, next) {
    try {
      const data = await notificationById(request.params.id, request.user.id)
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
