const table = 'Payment'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.datetime('UpdatedAt').defaultTo(knex.fn.now())
    table.integer('UserId').unsigned().notNullable()
    table.string('PaymentId', 250)
    table.string('subscriptionKey', 500)
    table.string('TotalAmount', 30)
    table.string('origin', 30)
    table.string('ItemReference', 30)
    table.string('OrderReference', 250)
    table.string('StudentReference', 50)
    table.string('Document', 50)
    table.string('TypeOfPayment', 10)
    table.string('PaymentStatus', 10)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
