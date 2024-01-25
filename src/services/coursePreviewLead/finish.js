const { ValidationError } = require('../../utils/errors')
const constantAuth = require(`../../constants/auth.constants`)
const database = require('../../database/config.database')
const { registerExistValidate } = require('../../validators/auth')
const AuthRegisterResponse = require('../../dto/auth/authRegister.response')

module.exports = class CoursePreviewLeadFinishService {
  constructor({ CoursePreviewLeadRepository, LoggerService }) {
    this.CoursePreviewLeadRepository = CoursePreviewLeadRepository
    this.LoggerService = LoggerService
  }

  request = async (coursePreviewLeadId) => {
    const step = this.LoggerService.addStep('AuthRegisterService')
    try {
      const updatedAt = new Date()
      const entity = { updatedAt }
      const leadData = await this.CoursePreviewLeadRepository.update(
        coursePreviewLeadId,
        entity
      )
      step.value.addData(leadData)
      return leadData
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
