class CoursePreviewResponse {
  constructor(data) {
    this.id = data.Id
    this.coursePreviewid = data.CoursePreviewId
    this.identifier = data.Identifier
    this.userId = data.UserId
    this.name = data.Name
    this.email = data.Email
    this.phone = data.Phone
    this.enabled = data.Enabled
  }
}

module.exports = CoursePreviewResponse
