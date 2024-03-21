const { requestValidate } = require('../../validators/notification')
const { ValidationError } = require('../../utils/errors')
const constants = require('../../constants/notification.constants')

class NotificationRequest {
  constructor(data) {
    this.isValidate(data)

    this.Title = data.title
    this.Content = data.content
    this.NotificationId = data.notificationId
    this.Data = data.data
    this.UserId = data.userId
  }

  isValidate(data) {
    const contract = requestValidate(data)
    if (!contract.isValid()) {
      throw new ValidationError(
        'Parâmetros inválidos',
        contract.errors(),
        constants.CODE
      )
    }
  }
}

module.exports = NotificationRequest
