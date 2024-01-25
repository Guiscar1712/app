const table = 'Feature'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.integer('FeatureTypeId').notNullable()
    table.string('Code', 50).notNullable()
    table.string('Segment', 255).notNullable()
    table.boolean('Enabled').notNullable()
    table.datetime('CreatedAt').defaultTo(knex.fn.now()).notNullable()
    table.datetime('UpdatedAt').defaultTo(null)
    table.datetime('DeletedAt').defaultTo(null)
    table.foreign('FeatureTypeId').references('FeatureType.Id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
