exports.up = function (knex) {
  return knex.schema.raw(`
  ALTER TABLE KrotonVitrine.dbo.Membership ALTER COLUMN RecoveryKey nvarchar(60) COLLATE SQL_Latin1_General_CP1_CI_AS NULL`)
}

exports.down = function (knex) {
  return knex.schema.raw(`
  ALTER TABLE KrotonVitrine.dbo.Membership ALTER COLUMN RecoveryKey nvarchar(60) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL`)
}
