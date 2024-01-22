const database = require('../../config.database')
const { RepositoryError } = require('../../../utils/errors')

module.exports = class SimpleQuery {
  static async findBy(query, from, transaction) {
    try {
      const result = await (transaction || database)
        .from(from)
        .where(query)
        .first()

      const data = result !== undefined ? result : null
      return data
    } catch (error) {
      throw new RepositoryError(error.message, error)
    }
  }

  static async deleteBy(query, from, transaction) {
    try {
      const data = await (transaction || database)
        .from(from)
        .where(query)
        .del('*')
      return data
    } catch (error) {
      throw new RepositoryError(error.message, error)
    }
  }

  static async filterBy(query, from, transaction) {
    try {
      const result = await (transaction || database).from(from).where(query)

      const data = result !== undefined ? result : []
      return data
    } catch (error) {
      throw new RepositoryError(error.message, error)
    }
  }

  static async filterAndOrderBy(query, sort, from, transaction) {
    try {
      const result = await (transaction || database)
        .from(from)
        .where(query)
        .orderBy(sort)

      const data = result !== undefined ? result : []
      return data
    } catch (error) {
      throw new RepositoryError(error.message, error)
    }
  }

  static async insert(entity, from, transaction) {
    try {
      const data = await (transaction || database)(from).insert(entity, '*')

      return data[0]
    } catch (error) {
      throw new RepositoryError(error.message, error)
    }
  }

  static async update(query, entity, from, transaction) {
    try {
      await (transaction || database)(from).update(entity).where(query)

      return { ...query, ...entity }
    } catch (error) {
      throw new RepositoryError(error.message, error)
    }
  }
}
