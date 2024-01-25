const table = 'CoursePreview'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.string('Identifier', 255).notNullable()
    table.string('URL', 2048).notNullable()
    table.boolean('Enabled').notNullable()
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.datetime('UpdatedAt')
    table.datetime('DeleteAt')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
