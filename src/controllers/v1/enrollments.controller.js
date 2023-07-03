const { ValidationError, NotFoundError } = require('../../utils/errors')
const { ApplyValidate } = require('../../validators/subscription')
const { searchForEnrollments } = require('../../services/enrollments')

module.exports = class EnrollmentsController {
  static async get (request, response, next) {
    try {
      const document = request.params.document

      const contract = ApplyValidate(document)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await searchForEnrollments(document)

      if (!data || data.length === 0) {
        throw new NotFoundError('Nenhum registro encontrado', { document })
      }

      response.json(data)
    } catch (error) {
      next(error)
    }
  }
}
