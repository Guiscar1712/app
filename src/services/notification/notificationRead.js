const moment = require('moment')
const notificationRepository = require('../../repositories/v1/notificationRepository')

async function notificationRead (id, UserId) {
  const DateRead = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  return await notificationRepository.update(id, UserId, { DateRead })
}

module.exports = notificationRead
