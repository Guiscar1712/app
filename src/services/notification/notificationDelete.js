const notificationRepository = require('../../repositories/v1/notificationRepository')

async function Delete (id, UserId) {
  return await notificationRepository.deleteBy({ id, UserId })
}

module.exports = Delete
