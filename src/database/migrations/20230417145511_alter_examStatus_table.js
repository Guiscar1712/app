const table = 'ExamStatus'

exports.up = function (knex) {
  return knex.schema.alterTable(table, table => {
    table.datetime('StartDate')
    table.datetime('EndDate')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable(table, table => {
    table.dropColumn('StartDate')
    table.dropColumn('EndDate')
  })
}
