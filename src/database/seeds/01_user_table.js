
const table = 'User'

exports.seed = async function (knex) {
  return knex.transaction((transaction) => {
    knex(table).del().then(() => {
      const insert = knex
        .insert([
          { Id: 1, Name: 'User Test 1', Username: 'username1', Password: 'password1' },
          { Id: 2, Name: 'User Test 2', Username: 'username1', Password: 'password2' }
        ])
        .into(table)

      return transaction
        .raw(insert)
        .wrap(
        `SET IDENTITY_INSERT [${table}] ON;`,
        `SET IDENTITY_INSERT [${table}] OFF;`
        )
        .then(transaction.commit)
        .catch(transaction.rollback)
    })
  })
}
