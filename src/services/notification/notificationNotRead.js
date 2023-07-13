const notificationRepository = require('../../repositories/v1/notificationRepository')

async function notificationNotRead (id, UserId) {
  const DateRead = null
  return await notificationRepository.update(id, UserId, { DateRead })
}

module.exports = notificationNotRead
