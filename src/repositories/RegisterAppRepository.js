const { SimpleQuery } = require('../database')
const table = 'RegisterApp'

module.exports = class RegisterAppRepository {
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

  static async findByToken (token, transaction) {
    return await this.findBy({ token }, transaction)
  }

  static async listByUserId (userId, transaction) {
    return await this.filterBy({ UserId: userId }, transaction)
  }

  static async insert (entity, transaction) {
    return format(await SimpleQuery.insert(entity, table, transaction))
  }

  static async update (id, UserId, entity, transaction) {
    return await SimpleQuery.update({ id, UserId }, entity, table, transaction)
  }
}

function format (row) {
  if (!row) {
    return null
  }
  return {
    id: row.Id,
    createdAt: row.CreatedAt,
    updatedAt: row.UpdatedAt,
    token: row.Token,
    userId: row.UserId
  }
}
