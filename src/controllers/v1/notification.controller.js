const { ValidationError, ClientServerError } = require('../../utils/errors')
const { notificationSave } = require('./../../services/notification')

module.exports = class NotificationController {
  static async save (request, response, next) {
    try {
      const { Title, Content, NotificationId, Data } = request.body

      if (!Title || !Content) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }

      const notification = await notificationSave(Title, Content, NotificationId, Data, request.user.id)
      if (notification && notification.Title) {
        return response.status(201).json(notification)
      }
      throw new ClientServerError('Something went wrong', notification)
    } catch (error) {
      next(error)
    }
  }
}
