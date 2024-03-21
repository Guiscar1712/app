const SimpleQuery = require('../../database/queries/v1/simpleQuery')
const table = 'RegisterApp'

module.exports = class RegisterAppRepository {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  findBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('RegisterAppRepositoryFindBy')
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

  insert = async (entity, transaction) => {
    const step = this.LoggerService.addStep('RegisterAppRepositoryInsert')
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

  update = async (id, entity = {}, transaction) => {
    const step = this.LoggerService.addStep('RegisterAppRepositoryUpdate')
    try {
      
      entity.updatedAt = new Date()
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
    token: row.Token,
    userId: row.UserId,
  }
}
