
const table = 'Membership'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.integer('UserId').unsigned()
    table.string('Password', 60).notNullable()
    table.string('RecoveryKey', 60).notNullable()
    table.foreign('UserId').references('User.Id')
    table.unique('UserId')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
