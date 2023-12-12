const table = 'FeatureElement'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.integer('FeatureId').notNullable()
    table.string('Key', 50).notNullable()
    table.string('Value', 255).notNullable()
    table.boolean('Enabled').notNullable()
    table.datetime('CreatedAt').defaultTo(knex.fn.now()).notNullable()
    table.datetime('UpdatedAt').defaultTo(null)
    table.datetime('DeletedAt').defaultTo(null)
    table.foreign('FeatureId').references('Feature.Id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
