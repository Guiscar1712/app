const SimpleQuery = require('../../database/queries/v1/simpleQuery')
const database = require('../../database/config.database')
const UpdateInIds = require('../../database/queries/v1/updateInIds')

const table = 'Notification'

module.exports = class UserRepository {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  static async findBy(query, transaction) {
    const row = await SimpleQuery.findBy(query, table, transaction)
    return format(row)
  }

  static async deleteBy(query, transaction) {
    const rows = await SimpleQuery.deleteBy(query, table, transaction)
    const items = []
    for (const row of rows) {
      items.push(format(row))
    }
    return items
  }

  filterBy = async (query, sort, transaction) => {
    const step = this.LoggerService.addStep('NotificationRepositoryFindBy')
    try {
      const rows = await SimpleQuery.filterAndOrderBy(
        query,
        sort,
        table,
        transaction
      )
      const data = []
      for (const row of rows) {
        data.push(format(row))
      }
      step.value.addData({ query, sort, data, transaction })
      return data
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
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
    return format(
      await SimpleQuery.update({ id, UserId }, entity, table, transaction)
    )
  }

  static async updateByIds(ids, entity, transaction) {
    return format(await UpdateInIds('id', ids, entity, table, transaction))
  }
}

function format(row) {
  if (!row) {
    return null
  }
  return {
    id: row.Id,
    createdAt: row.CreatedAt,
    title: row.Title,
    content: row.Content,
    data: row.Data,
    notificationType: row.NotificationType,
    dateRead: row.DateRead,
    userId: row.UserId,
  }
}
