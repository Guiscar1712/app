const SimpleQuery = require('../../database/queries/v1/simpleQuery')
const table = 'CoursePreviewLead'

module.exports = class CoursePreviewRepository {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  save = async (entity, transaction) => {
    const step = this.LoggerService.addStep('CoursePreviewLeadRepositoryInsert')
    try {
      const data = await SimpleQuery.insert(entity, table, transaction)
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
    const step = this.LoggerService.addStep('CoursePreviewLeadRepositoryUpdate')
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
