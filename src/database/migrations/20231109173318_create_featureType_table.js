const table = 'FeatureType'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.string('Code', 50).notNullable()
    table.string('Description', 255).notNullable()
    table.boolean('SingleInstance').notNullable()
    table.boolean('Enabled').notNullable()
    table.datetime('CreatedAt').defaultTo(knex.fn.now()).notNullable()
    table.datetime('UpdatedAt').defaultTo(null)
    table.datetime('DeletedAt').defaultTo(null)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
