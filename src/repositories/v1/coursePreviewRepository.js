const SimpleQuery = require('../../database/queries/v1/simpleQuery')
const database = require('../../database/config.database')
const { coursePreviewResponse } = require('../../dto/coursePreview')
const table = 'CoursePreview'

module.exports = class CoursePreviewRepository {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  findByInIdentifiers = async (identifiers, transaction) => {
    const step = this.LoggerService.addStep(
      'CoursePreviewRepositoryFindByInIdentifier'
    )
    try {
      const rows = await SimpleQuery.findByIn(
        'identifier',
        identifiers,
        table,
        transaction
      )

      const data = []
      for (const row of rows) {
        data.push(new coursePreviewResponse(row))
      }
      step.value.addData({ query, data, transaction })
      return data
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  static async findByIn(identifiers, transaction) {
    let query = `SELECT * FROM CoursePreview WHERE Enabled = 1 AND Identifier IN ('${identifiers}')`

    const rows = await database.raw(query)

    const data = []
    for (const row of rows) {
      data.push(new coursePreviewResponse(row))
    }
    return data
  }
}
