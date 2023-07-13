const notificationRepository = require('../../repositories/v1/notificationRepository')

async function Save (title, content, notificationId, data, userId) {
  const paymentData = {
    Title: title,
    Content: content,
    NotificationId: notificationId,
    Data: data,
    NotificationType: data.notificationType,
    UserId: userId
  }

  return await notificationRepository.insert(paymentData)
}

module.exports = Save
