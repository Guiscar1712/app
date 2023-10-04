const { ValidationError } = require('../../utils/errors')
const {
  CpfValidate,
  IdOriginValidate,
} = require('../../validators/subscription')
const { searchForEnrollments } = require('../../services/enrollments')

module.exports = class EnrollmentsController {
  constructor({ LoggerService, EnrollmentDetails }) {
    this.LoggerService = LoggerService
    this.EnrollmentDetails = EnrollmentDetails
  }

  static async get(request, response, next) {
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

  getDetails = async (request, response, next) => {
    try {
      const idOrigin = request.params.idOrigin

      const contract = IdOriginValidate(idOrigin)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await this.EnrollmentDetails.get(idOrigin)

      this.LoggerService.finalize()
      return response.json(data)
    } catch (error) {
      this.LoggerService.setError(error)
      this.LoggerService.finalize()
      next(error)
    }
  }

  getDetailsV2 = async (request, response, next) => {
    try {
      const idOrigin = request.params.idOrigin

      const contract = IdOriginValidate(idOrigin)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await this.EnrollmentDetails.get(idOrigin)

      next(data)
    } catch (error) {
      next(error)
    }
  }
}
