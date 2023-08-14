const { SimpleQuery } = require('../../database')
const table = 'Membership'

module.exports = class MembershipRepository {
  findBy = async (query, transaction) => {
    const row = await SimpleQuery.findBy(query, table, transaction)
    return format(row)
  }

  insert = async (entity, transaction) => {
    return format(await SimpleQuery.insert(entity, table, transaction))
  }
}

function format (row) {
  if (!row) {
    return null
  }
  return {
    id: row.Id,
    createdAt: row.CreatedAt,
    userId: row.UserId,
    password: row.Password,
    recoveryKey: row.RecoveryKey
  }
}
