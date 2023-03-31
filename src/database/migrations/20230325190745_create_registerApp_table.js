
const table = 'RegisterApp'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.datetime('UpdatedAt').defaultTo(knex.fn.now())
    table.string('Token', 250)
    table.integer('UserId').unsigned().notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
