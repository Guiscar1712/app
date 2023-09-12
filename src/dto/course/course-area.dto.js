function toDto (item) {
  return {
    id: item.id,
    name: item.Name,
    icon: item.Icon,
    identifier: item.Identifier,
    image: item.Image
  }
}

module.exports = (item) => {
  if (Array.isArray(item)) {
    const courses = []

    item.forEach((element) => {
      courses.push(toDto(element))
    })

    return courses
  }
  return toDto(item)
}
