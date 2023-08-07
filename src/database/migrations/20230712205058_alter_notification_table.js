const table = 'Notification'

exports.up = function (knex) {
  return knex.schema.alterTable(table, table => {
    table.string('Data', 4000)
    table.string('NotificationType', 20)
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable(table, table => {
    table.dropColumn('Data')
    table.dropColumn('NotificationType')
  })
}
