const moment = require('moment')
const database = require('../database/config.database')
const { SimpleQuery } = require('../database')
const table = 'User'

module.exports = class UserRepository {
  static async findBy(query, transaction) {
    const row = await SimpleQuery.findBy(query, table, transaction)
    return format(row)
  }

  static async deleteBy(query, transaction) {
    return await SimpleQuery.deleteBy(query, table, transaction)
  }

  static async filterBy(query, transaction) {
    const rows = await SimpleQuery.filterBy(query, table, transaction)
    const items = []
    for (const row of rows) {
      items.push(format(row))
    }
    return items
  }

  static async findById(id, transaction) {
    return await this.findBy({ Id: id }, transaction)
  }

  static async list(transaction) {
    return await this.filterBy({}, transaction)
  }

  static async insert(entity, transaction) {
    return format(await SimpleQuery.insert(entity, table, transaction))
  }

  static async update(id, entity, transaction) {
    return await SimpleQuery.update({ id }, entity, table, transaction)
  }

  static async findByOr(cpf, email, phone, transaction) {
    const result = await (transaction || database)(table)
      .where(cpf)
      .orWhere(email)
      .orWhere(phone)

    const items = []
    for (const row of result) {
      items.push(format(row))
    }

    return items
  }
}

function format(row) {
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
    birthday: row.BirthDay
      ? moment(row.BirthDay).add(3, 'hours').format('DD/MM/YYYY')
      : null,
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
    state: row.State,
  }
}
