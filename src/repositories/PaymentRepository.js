const { SimpleQuery } = require('../database')
const table = 'Payment'

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

  static async insert (entity, transaction) {
    return format(await SimpleQuery.insert(entity, table, transaction))
  }

  static async update (id, entity, transaction) {
    return await SimpleQuery.update({ id }, entity, table, transaction)
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
    paymentId: row.PaymentId,
    subscriptionKey: row.subscriptionKey,
    totalAmount: row.TotalAmount,
    origin: row.origin,
    itemReference: row.ItemReference,
    orderReference: row.OrderReference,
    studentReference: row.StudentReference,
    document: row.Document,
    typeOfPayment: row.TypeOfPayment,
    paymentStatus: row.PaymentStatus
  }
}
