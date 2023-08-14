const database = require('../config.database')

module.exports = class SimpleQuery {
  static async findBy (query, from, transaction) {
    try {
      const result = await (transaction || database)
        .from(from)
        .where(query)
        .first()

      const data = result !== undefined ? result : null
      return data
    } catch (error) {
      console.log(error)
      return error.code + ':' + error.message
    }
  }

  static async deleteBy (query, from, transaction) {
    try {
      const result = await (transaction || database)
        .from(from)
        .where(query)
        .del('*')

      const data = result !== undefined ? result : null
      return data
    } catch (error) {
      console.log(error)
      return error.code + ':' + error.message
    }
  }

  static async filterBy (query, from, transaction) {
    try {
      const result = await (transaction || database)
        .from(from)
        .where(query)

      const data = result !== undefined ? result : []
      return data
    } catch (error) {
      console.log(error)
      return error.code + ':' + error.message
    }
  }

  static async insert (entity, from, transaction) {
    try {
      const result = await (transaction || database)(from).insert(
        entity,
        '*'
      )

      const data = result !== undefined ? result : null
      return data[0]
    } catch (error) {
      console.log(error)
      return null
    }
  }

  static async update (query, entity, from, transaction) {
    try {
      const result = await (transaction || database)(from)
        .update(entity)
        .where(query)

      const data = result !== undefined ? result : null
      return { ...query, ...data }
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
