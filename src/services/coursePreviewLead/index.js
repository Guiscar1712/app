module.exports = class CoursePreviewService {
  constructor({
    CoursePreviewLeadStartService,
    CoursePreviewLeadFinishService,
  }) {
    this.CoursePreviewLeadStartService = CoursePreviewLeadStartService
    this.CoursePreviewLeadFinishService = CoursePreviewLeadFinishService
  }

  start = async (model) => {
    return await this.CoursePreviewLeadStartService.request(model)
  }

  finish = async (coursePreviewLeadId) => {
    return await this.CoursePreviewLeadFinishService.request(
      coursePreviewLeadId
    )
  }
}
