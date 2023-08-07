const table = 'Payment'

exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments('Id')
    table.datetime('CreatedAt').defaultTo(knex.fn.now())
    table.datetime('UpdatedAt').defaultTo(knex.fn.now())
    table.integer('UserId').unsigned().notNullable()
    table.string('Document', 50)
    table.string('StudentReference', 50)
    table.integer('OriginId').unsigned().notNullable()
    table.string('System', 30)
    table.string('BusinessKey', 500)
    table.string('OrderReference', 250)
    table.string('InvoiceType', 30)
    table.string('PaymentType', 10)
    table.string('PaymentStatus', 10)
    table.datetime('PaymentDate')
    table.decimal('TotalAmount', 8, 2)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(table)
}
