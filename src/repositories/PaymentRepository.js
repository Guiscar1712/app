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
    document: row.Document,
    studentReference: row.StudentReference,
    originId: row.OriginId,
    system: row.System,
    businessKey: row.BusinessKey,
    orderReference: row.OrderReference,
    invoiceType: row.InvoiceType,
    paymentType: row.PaymentType,
    paymentStatus: row.PaymentStatus,
    totalAmount: row.TotalAmount
  }
}
