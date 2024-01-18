const table = 'User'

exports.up = function (knex) {
  return knex.schema.alterTable(table, (table) => {
    table.boolean('OptinSMS')
    table.boolean('OptinEmail')
    table.boolean('OptinWhatsapp')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable(table, (table) => {
    table.dropColumn('OptinSMS')
    table.dropColumn('OptinEmail')
    table.dropColumn('OptinWhatsapp')
  })
}
