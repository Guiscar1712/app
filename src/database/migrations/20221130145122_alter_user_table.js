
const table = 'User'

exports.up = function (knex) {
  return knex.schema.alterTable(table, (table) => {
    table.string('Photo', 255)
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable(table, (table)=>{
    table.dropColumn('Photo');
  });
}
