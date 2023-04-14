const table = 'ExamInstructions'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.datetime('UpdatedAt').defaultTo(knex.fn.now())
    table.string('Icon', 250)
    table.string('Description', 250)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
