
function toDto (item) {
  return {
    name: item.Name,
    identifier: item.Identifier,
    type: item.Type,
    score: item.Score,
    semesters: item.Semesters,
    krotonId: item.KrotonId,
    averageSalary: item.AverageSalary,
    image: item.Image,
    priceFrom: item.Price ? item.Price.monthlyPriceFrom : 0,
    priceTo: item.Price ? item.Price.monthlyPriceTo : 0
  }
}

module.exports = (item) => {
  if (Array.isArray(item)) {
    const courses = []

    item.forEach(element => {
      // Remover esta condição apos implementasção no StrApi
      if (element.Price) {
        courses.push(toDto(element))
      }
    })

    return courses
  }

  // Remover esta condição apos implementasção no StrApi
  if (!item.Price) {
    return null
  }
  return toDto(item)
}
