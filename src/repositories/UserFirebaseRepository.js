const { SimpleQuery } = require('../database')
const table = 'UserFirebase'

module.exports = class RegisterAppRepository {
  static async findByUid (uid, transaction) {
    const row = await SimpleQuery.findBy({ Uid: uid }, table, transaction)
    return format(row)
  }

  static async listUIdsByUserId (userId, transaction) {
    const rows = await SimpleQuery.filterBy({ UserId: userId }, table, transaction)
    const items = []
    for (const row of rows) {
      items.push(formatUid(row))
    }
    return items
  }

  static async insert (entity, transaction) {
    return format(await SimpleQuery.insert(entity, table, transaction))
  }

  static async deleteBy (query, transaction) {
    return await SimpleQuery.deleteBy(query, table, transaction)
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
    userId: row.UserId,
    uid: row.Uid,
    signInProvider: row.SignInProvider
  }
}

function formatUid (row) {
  if (!row) {
    return null
  }
  return row.Uid
}
