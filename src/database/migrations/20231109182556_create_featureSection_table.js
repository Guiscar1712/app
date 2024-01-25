const table = 'FeatureSection'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.integer('FeatureId').notNullable()
    table.integer('SectionId').notNullable()
    table.integer('Order').notNullable()
    table.string('Segment', 255).notNullable()
    table.boolean('Enabled').notNullable()
    table.datetime('BeginDate').notNullable()
    table.datetime('EndDate').notNullable()
    table.datetime('CreatedAt').defaultTo(knex.fn.now()).notNullable()
    table.datetime('UpdatedAt').defaultTo(null)
    table.datetime('DeletedAt').defaultTo(null)
    table.foreign('FeatureId').references('Feature.Id')
    table.foreign('SectionId').references('Section.Id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
