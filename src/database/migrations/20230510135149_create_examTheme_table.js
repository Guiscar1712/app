const table = 'ExamTheme'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.datetime('UpdatedAt').defaultTo(knex.fn.now())
    table.integer('ThemeId')
    table.string('Theme', 500)
    table.boolean('IsActive')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
