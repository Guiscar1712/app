const notificationRepository = require('../../repositories/notificationRepository')

async function notificationList(UserId) {
  const order = { column: 'id', order: 'desc' }
  return await notificationRepository.filterBy({ UserId }, [order])
}

module.exports = notificationList
