const table = 'NotificationPreference'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.specificType('Preference', 'char(1)').notNullable()
    table.integer('UserId').unsigned().notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
