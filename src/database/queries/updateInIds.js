const database = require('../config.database')

async function UpdateInIds (queryFields, queryValues, entity, from, transaction) {
  try {
    await (transaction || database)(from)
      .update(entity)
      .whereIn(queryFields, queryValues)

    return { ...queryFields, ...queryValues, ...entity }
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = UpdateInIds
