const notificationRepository = require('../../repositories/v1/notificationRepository')

async function notificationById (Id, UserId) {
  return await notificationRepository.findBy({ Id, UserId })
}

module.exports = notificationById
