class CoursePreviewLeadModel {
  constructor(data) {
    this.Identifier = data.identifier
    this.Name = data.name
    this.Email = data.email
    this.Phone = data.phone
  }
}

module.exports = CoursePreviewLeadModel
