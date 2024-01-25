class CoursePreviewResponse {
  constructor(data) {
    this.id = data.Id
    this.identifier = data.Identifier
    this.url = data.URL
    this.enabled = data.Enabled
    this.createdAt = data.CreatedAt
    this.updatedAt = data.UpdatedAt
    this.deleteAt = data.DeletedAt
  }
}

module.exports = CoursePreviewResponse
