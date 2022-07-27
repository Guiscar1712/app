
const database = require('./config.database')
const table = 'User'

module.exports = class UserDatabase {
  static async findByLogin (username, password) {
    // Exemplo usando query nativa
    /* const result = await database.raw(`
    Select
        Id as 'id',
        Name as 'name',
        Username as 'username'
    From
        [User] where username = :username and password = :password
    `,
    { username, password })

    return result[0] */

    const result = await database
      .select(
        'id',
        'name',
        'username'
      )
      .from(table)
      .where({ username, password })
      .first()

    return result
  }

  static async list () {
    const result = await database
      .select(
        'id',
        'name',
        'username'
      )
      .from(table)

    return result
  }
}
