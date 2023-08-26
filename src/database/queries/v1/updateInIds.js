const database = require('../../config.database')
const { RepositoryError } = require('../../../utils/errors')

async function UpdateInIds (queryFields, queryValues, entity, from, transaction) {
  try {
    await (transaction || database)(from)
      .update(entity)
      .whereIn(queryFields, queryValues)

    return { ...queryFields, ...queryValues, ...entity }
  } catch (error) {
    throw new RepositoryError(error.message, error)
  }
}

module.exports = UpdateInIds
