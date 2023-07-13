const notificationSave = require('./notificationSave')
const notificationList = require('./notificationlist')
const notificationById = require('./notificationById')
const notificationDelete = require('./notificationDelete')
const notificationRead = require('./notificationRead')
const notificationNotRead = require('./notificationNotRead')
const notificationAllRead = require('./notificationAllRead')

module.exports = {
  notificationSave,
  notificationList,
  notificationById,
  notificationDelete,
  notificationRead,
  notificationNotRead,
  notificationAllRead
}
