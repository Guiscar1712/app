
const table = 'Notification'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.string('NotificationId', 250)
    table.string('Title', 250).notNullable()
    table.string('Content', 4000).nullable()
    table.datetime('DateRead').nullable()
    table.integer('UserId').unsigned().notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
