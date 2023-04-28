const table = 'ExamStatus'

exports.up = function (knex) {
  return knex.schema.alterTable(table, table => {
    table.string('Status', 10)
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable(table, table => {
    table.dropColumn('Status')
  })
}
