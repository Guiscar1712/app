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
      step.value.addData({ query, data, transaction })
      return data
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  deleteBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('PaymentRepositoryDeleteBy')
    try {
      const res = await SimpleQuery.deleteBy(query, table, transaction)
      step.value.addData({ query, transaction })
      return res
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  filterBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('PaymentRepositoryFilterBy')
    try {
      step.value.addData({ query, transaction })
      const rows = await SimpleQuery.filterBy(query, table, transaction)
      const items = []
      for (const row of rows) {
        items.push(format(row))
      }
      return items
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  insert = async (entity, transaction) => {
    const step = this.LoggerService.addStep('PaymentRepositoryInsert')
    try {
      const row = await SimpleQuery.insert(entity, table, transaction)
      const data = format(row)
      step.value.addData(data)
      return data
    } catch (error) {
      step.value.addData({ inputData: { entity, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  update = async (id, entity, transaction) => {
    const step = this.LoggerService.addStep('PaymentRepositoryUpdate')
    try {
      step.value.addData({ id, entity, transaction })
      return await SimpleQuery.update({ id }, entity, table, transaction)
    } catch (error) {
      step.value.addData({ inputData: { entity, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
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
