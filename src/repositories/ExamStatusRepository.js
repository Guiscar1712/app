const { SimpleQuery } = require('../database')
const table = 'ExamStatus'

module.exports = class RegisterAppRepository {
  static async findInternalBy (query, transaction) {
    const row = await SimpleQuery.findBy(query, table, transaction)
    return row
  }

  static async findBy (query, transaction) {
    const row = await SimpleQuery.findBy(query, table, transaction)
    return format(row)
  }

  static async deleteBy (query, transaction) {
    return await SimpleQuery.deleteBy(query, table, transaction)
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

  static async update (id, entity, transaction) {
    delete entity.Id
    return await SimpleQuery.update({ id }, entity, table, transaction)
  }
}

function format (row) {
  if (!row) {
    return null
  }
  return {
    id: row.Id,
    subscriptionKey: row.SubscriptionKey,
    attempts: row.Attempts,
    characters: row.Characters,
    duration: row.Duration,
    themeId: row.ThemeId,
    theme: row.Theme
  }
}

function formatInternal (row) {
  if (!row) {
    return null
  }
  return {
    Id: row.Id,
    SubscriptionKey: row.SubscriptionKey,
    Attempts: row.Attempts,
    Characters: row.Characters,
    Duration: row.Duration,
    ThemeId: row.ThemeId,
    Theme: row.Theme
  }
}
