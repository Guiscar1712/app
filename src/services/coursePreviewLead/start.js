const { CoursePreviewLeadModel } = require('../../dto/coursePreviewLead')

module.exports = class CoursePreviewLeadStartService {
  constructor({ CoursePreviewLeadRepository, LoggerService }) {
    this.CoursePreviewLeadRepository = CoursePreviewLeadRepository
    this.LoggerService = LoggerService
  }

  request = async (model) => {
    const step = this.LoggerService.addStep('CoursePreviewStartService')
    try {
      const data = new CoursePreviewLeadModel(model)
      const leadData = await this.CoursePreviewLeadRepository.save(data)
      step.value.addData(leadData)
      return leadData
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
