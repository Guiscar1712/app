const { ValidationError } = require('../../utils/errors')
const { CpfValidate, IdOriginValidate } = require('../../validators/subscription')
const { searchForEnrollments, enrollmentDetails } = require('../../services/enrollments')

module.exports = class EnrollmentsController {
  static async get (request, response, next) {
    try {
      const document = request.params.document

      const contract = CpfValidate(document)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await searchForEnrollments(document)

      response.json(data)
    } catch (error) {
      next(error)
    }
  }

  static async getDetails (request, response, next) {
    try {
      const idOrigin = request.params.idOrigin

      const contract = IdOriginValidate(idOrigin)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await enrollmentDetails(idOrigin)

      response.json(data)
    } catch (error) {
      next(error)
    }
  }
}
