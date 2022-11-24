
const table = 'User'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.string('Name', 60).notNullable()
    table.string('Email', 255).nullable()
    table.string('CPF', 20).notNullable()
    table.string('Phone', 20).nullable()
    table.specificType('Gender', 'char(1)').notNullable()
    table.date('BirthDay').nullable()
    table.unique('CPF')
    table.unique('Email')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
