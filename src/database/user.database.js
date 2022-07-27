
const database = require('./config.database')

module.exports = class UserDatabase {
  static async findByLogin (username, password) {
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
      .from('User')
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
      .from('User')

    return result
  }
}
