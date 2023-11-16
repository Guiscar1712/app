const moment = require('moment')
const database = require('../../database/config.database')
const SimpleQuery = require('../../database/queries/v1/simpleQuery')
const table = 'User'

module.exports = class UserRepository {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  findBy = async (query, transaction) => {
    const step = this.LoggerService.addStep('UserRepositoryFindBy')
    try {
      const row = await SimpleQuery.findBy(query, table, transaction)
      const data = format(row)
      step.value.addData({ query, data, transaction })
      return data
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  insert = async (entity, transaction) => {
    const step = this.LoggerService.addStep('UserRepositoryInsert')
    try {
      const row = await SimpleQuery.insert(entity, table, transaction)
      const data = format(row)
      step.value.addData(data)
      return data
    } catch (error) {
      step.value.addData({ inputData: { entity, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

    update = async (id, entity, transaction) => {
    const step = this.LoggerService.addStep('UserRepositoryUpdate')
    try {
      step.value.addData({ id, entity, transaction })
      return await SimpleQuery.update({ id }, entity, table, transaction)
    } catch (error) {
      step.value.addData({ inputData: { entity, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  findByCpfOrEmailOrPhone = async (cpf, email, phone, transaction) => {
    const step = this.LoggerService.addStep(
      'UserRepositoryFindByCpfOrEmailOrPhone'
    )
    try {
      const result = await (transaction || database)(table)
        .where(cpf)
        .orWhere(email)
        .orWhere(phone)

      const items = []
      for (const row of result) {
        items.push(format(row))
      }
      step.value.addData(items)
      return items
    } catch (error) {
      step.value.addData({
        inputData: { cpf, email, phone, transaction },
        error,
      })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
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
    state: row.State,
  }
}
