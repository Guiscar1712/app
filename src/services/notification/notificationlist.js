const notificationRepository = require('../../repositories/v1/notificationRepository')

async function notificationList (UserId) {
  return await notificationRepository.filterBy({ UserId })
}

module.exports = notificationList
