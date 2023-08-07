const moment = require('moment')
const notificationRepository = require('../../repositories/v1/notificationRepository')

async function notificationAllRead (UserId) {
  const query = { UserId, DateRead: null }
  const notifications = await notificationRepository.filterBy(query)

  const notificationsIds = notifications.map(f => { return f.id })

  const DateRead = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  return await notificationRepository.updateByIds(notificationsIds, { DateRead })
}

module.exports = notificationAllRead
