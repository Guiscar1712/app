const SimpleQuery = require('../../database/queries/v1/simpleQuery')
const UpdateInIds = require('../../database/queries/v1/updateInIds')

const table = 'Notification'

module.exports = class NotificationRepository {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  deleteBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('NotificationRepositoryDelete')
    try {
      const rows = await SimpleQuery.deleteBy(query, table, transaction)
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

  filterBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('NotificationRepositoryFindBy')
    try {
      const sort = [{ column: 'id', order: 'desc' }]
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

  findById = async (id, transaction) => {
    const step = this.LoggerService.addStep('NotificationRepositoryFindById')
    try {
      return await SimpleQuery.findBy({ Id: id }, table, transaction)
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  find = async (query, transaction) => {
    const step = this.LoggerService.addStep('NotificationRepositoryFindById')
    try {
      return await SimpleQuery.findBy(query, table, transaction)
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  list = async (transaction) => {
    const step = this.LoggerService.addStep('NotificationRepositoryList')
    try {
      return await this.filterBy({}, transaction)
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  insert = async (entity, transaction) => {
    const step = this.LoggerService.addStep('NotificationRepositoryInsert')
    try {
      return format(await SimpleQuery.insert(entity, table, transaction))
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  update = async (id, UserId, entity, transaction) => {
    const step = this.LoggerService.addStep('NotificationRepositoryUpdate')
    try {
      return format(
        await SimpleQuery.update({ id, UserId }, entity, table, transaction)
      )
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  updateByIds = async (ids, entity, transaction) => {
    const step = this.LoggerService.addStep('NotificationRepositoryUpdateByIds')
    try {
      return format(await UpdateInIds('id', ids, entity, table, transaction))
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
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
    title: row.Title,
    content: row.Content,
    data: row.Data,
    notificationType: row.NotificationType,
    dateRead: row.DateRead,
    userId: row.UserId,
  }
}
