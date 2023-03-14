exports.up = function (knex) {
  return knex.schema.raw(`
  ALTER TABLE KrotonVitrineHomolog.dbo.[User] ALTER COLUMN CPF nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL`)
}

exports.down = function (knex) {
  return knex.schema.raw(`
  ALTER TABLE KrotonVitrineHomolog.dbo.[User] ALTER COLUMN CPF nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL`)
}
