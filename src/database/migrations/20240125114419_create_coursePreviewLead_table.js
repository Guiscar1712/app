const table = 'CoursePreviewLead'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.string('Identifier', 255).notNullable()
    table.integer('UserId')
    table.string('Name', 120).notNullable()
    table.string('Email', 255).notNullable()
    table.string('Phone', 20).notNullable()
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.datetime('UpdatedAt').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
