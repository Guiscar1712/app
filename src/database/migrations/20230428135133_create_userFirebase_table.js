
const table = 'UserFirebase'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.datetime('UpdatedAt').defaultTo(knex.fn.now())
    table.integer('UserId').unsigned().notNullable()
    table.string('SignInProvider', 60)
    table.string('Uid', 60)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
