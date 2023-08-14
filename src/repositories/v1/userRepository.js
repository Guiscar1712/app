const moment = require('moment')
const { SimpleQuery } = require('../../database')
const table = 'User'

module.exports = class UserRepository {
  findBy = async (query, transaction) => {
    const row = await SimpleQuery.findBy(query, table, transaction)
    return format(row)
  }

  insert = async (entity, transaction) => {
    return format(await SimpleQuery.insert(entity, table, transaction))
  }
}

function format (row) {
  if (!row) {
    return null
  }
  return {
    id: row.Id,
    createdAt: row.CreatedAt,
    name: row.Name,
    email: row.Email,
    cpf: row.CPF,
    phone: row.Phone,
    gender: row.Gender,
    birthday: row.BirthDay ? moment(row.BirthDay).format('DD/MM/YYYY') : null,
    photo: row.Photo,
    city: row.City,
    address: row.Address,
    number: row.Number,
    complement: row.Complement,
    notifyFreeCourses: row.NotifyFreeCourses,
    notifyEvents: row.NotifyEvents,
    notifyPromotions: row.NotifyPromotions,
    alertWarnings: row.AlertWarnings,
    alertTeatchers: row.AlertTeatchers,
    zipcode: row.Zipcode,
    state: row.State
  }
}
