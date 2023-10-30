const SimpleQuery = require('../../database/queries/v1/simpleQuery')
const table = 'Membership'

module.exports = class MembershipRepository {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  findBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('MembershipRepositoryFindBy')
    try {
      const row = await SimpleQuery.findBy(query, table, transaction)
      const data = format(row)
      step.value.addData(data)
      return data
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  insert = async (entity, transaction) => {
    const step = this.LoggerService.addStep('MembershipRepositoryInsert')
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
    const step = this.LoggerService.addStep('MembershipRepositoryUpdate')
    try {
      const row = await SimpleQuery.update(
        { Id: id },
        entity,
        table,
        transaction
      )
      const data = format(row)
      step.value.addData(data)
      return data
    } catch (error) {
      step.value.addData({ inputData: { id, entity, transaction }, error })
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
    userId: row.UserId,
    password: row.Password,
    recoveryKey: row.RecoveryKey,
  }
}
