class CourseArea {
  id
  name
  icon
  identifier
  image

  constructor (data) {
    this.id = data.id
    this.name = data.Name
    this.icon = data.Icon
    this.identifier = data.Identifier
    this.image = data.Image
  }
}

module.exports = CourseArea
