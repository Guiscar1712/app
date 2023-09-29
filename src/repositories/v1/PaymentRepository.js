const SimpleQuery = require('../../database/queries/v1/simpleQuery')
const table = 'Payment'

module.exports = class PaymentRepository {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  findBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('PaymentRepositoryFindBy')
    try {
      const row = await SimpleQuery.findBy(query, table, transaction)
      const data = format(row)
      step.finalize({ query, data, transaction })
      return data
    } catch (error) {
      step.finalize({ inputData: { query, transaction }, error })
      throw error
    }
  }

  deleteBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('PaymentRepositoryDeleteBy')
    try {
      return await SimpleQuery.deleteBy(query, table, transaction)
    } catch (error) {
      step.finalize({ inputData: { query, transaction }, error })
      throw error
    }
  }

  filterBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('PaymentRepositoryFilterBy')
    try {
      const rows = await SimpleQuery.filterBy(query, table, transaction)
      const items = []
      for (const row of rows) {
        items.push(format(row))
      }
      return items
    } catch (error) {
      step.finalize({ inputData: { query, transaction }, error })
      throw error
    }
  }

  insert = async (entity, transaction) => {
    const step = this.LoggerService.addStep('PaymentRepositoryInsert')
    try {
      const row = await SimpleQuery.insert(entity, table, transaction)
      const data = format(row)
      step.finalize(data)
      return data
    } catch (error) {
      step.finalize({ inputData: { entity, transaction }, error })
      throw error
    }
  }

  update = async (id, entity, transaction) => {
    const step = this.LoggerService.addStep('PaymentRepositoryUpdate')
    try {
      return await SimpleQuery.update({ id }, entity, table, transaction)
    } catch (error) {
      step.finalize({ inputData: { entity, transaction }, error })
      throw error
    }
  }
}

function format(row) {
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
    totalAmount: row.TotalAmount,
  }
}
