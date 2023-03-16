const table = 'User'

exports.up = function (knex) {
  return knex.schema.alterTable(table, table => {
    table.string('Zipcode', 60)
    table.specificType('State', 'char(2)')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable(table, table => {
    table.dropColumn('Zipcode')
    table.dropColumn('State')
  })
}
