const { SimpleQuery } = require('../database')
const table = 'NotificationPreference'

module.exports = class UserRepository {
  static async deleteBy (query, transaction) {
    return format(await SimpleQuery.deleteBy(query, table, transaction))
  }

  static async filterBy (query, transaction) {
    const rows = await SimpleQuery.filterBy(query, table, transaction)
    const items = []
    for (const row of rows) {
      items.push(format(row))
    }
    return items
  }

  static async insert (entity, transaction) {
    return format(await SimpleQuery.insert(entity, table, transaction))
  }
}

function format (row) {
  if (!row) {
    return null
  }
  return {
    id: row.Id,
    Preference: row.Preference
  }
}
