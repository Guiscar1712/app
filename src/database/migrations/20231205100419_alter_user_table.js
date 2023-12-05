const table = 'User'

exports.up = function (knex) {
  return knex.schema.alterTable(table, (table) => {
    table.boolean('Optin')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable(table, (table) => {
    table.dropColumn('Optin')
  })
}
