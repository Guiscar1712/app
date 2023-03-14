exports.up = function (knex) {
  return knex.schema.raw(`
  DROP INDEX user_cpf_unique ON KrotonVitrineHomolog.dbo.[User]`)
}

exports.down = function (knex) {
  return knex.schema.raw(`
  CREATE UNIQUE INDEX user_cpf_unique ON KrotonVitrineHomolog.dbo.[User] (CPF)`)
}
