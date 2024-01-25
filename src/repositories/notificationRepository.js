const { SimpleQuery, UpdateInIds } = require('../database')
const table = 'Notification'

module.exports = class UserRepository {
  static async findBy(query, transaction) {
    const row = await SimpleQuery.findBy(query, table, transaction)
    return format(row)
  }

  static async deleteBy(query, transaction) {
    return await SimpleQuery.deleteBy(query, table, transaction)
  }

  static async filterBy(query, sort, transaction) {
    const rows = await SimpleQuery.filterAndOrderBy(
      query,
      sort,
      table,
      transaction
    )
    const items = []
    for (const row of rows) {
      items.push(format(row))
    }
    return items
  }

  static async findById(id, transaction) {
    return await this.findBy({ Id: id }, transaction)
  }

  static async list(transaction) {
    return await this.filterBy({}, transaction)
  }

  static async insert(entity, transaction) {
    return format(await SimpleQuery.insert(entity, table, transaction))
  }

  static async update(id, UserId, entity, transaction) {
    return await SimpleQuery.update({ id, UserId }, entity, table, transaction)
  }

  static async updateByIds(ids, entity, transaction) {
    return await UpdateInIds('id', ids, entity, table, transaction)
  }
}

function format(row) {
  if (!row) {
    return null
  }
  return {
    id: row.Id,
    createdAt: row.CreatedAt,
    Title: row.Title,
    Content: row.Content,
    DateRead: row.DateRead,
    UserId: row.UserId,
  }
}
