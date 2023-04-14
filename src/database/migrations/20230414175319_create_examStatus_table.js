const table = 'ExamStatus'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.datetime('UpdatedAt').defaultTo(knex.fn.now())
    table.string('SubscriptionKey', 500)
    table.integer('Attempts')
    table.integer('Characters')
    table.integer('Duration')
    table.integer('ThemeId')
    table.string('Theme', 500)
    table.integer('UserId').unsigned().notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
