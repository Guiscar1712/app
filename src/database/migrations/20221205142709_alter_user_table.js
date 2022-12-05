
const table = 'User'

exports.up = function (knex) {
  return knex.schema.alterTable(table, (table) => {
    table.string('City', 60)
    table.string('Address', 60)
    table.string('Number', 20)
    table.string('Complement', 60)
    table.boolean('NotifyFreeCourses')
    table.boolean('NotifyEvents')
    table.boolean('NotifyPromotions')
    table.boolean('AlertWarnings')
    table.boolean('AlertTeatchers')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable(table, (table)=>{
    table.dropColumn('City');
    table.dropColumn('Address');
    table.dropColumn('Number');
    table.dropColumn('Complement');
    table.dropColumn('NotifyFreeCourses')
    table.dropColumn('NotifyEvents')
    table.dropColumn('NotifyPromotions')
    table.dropColumn('AlertWarnings')
    table.dropColumn('AlertTeatchers')
  });
}
