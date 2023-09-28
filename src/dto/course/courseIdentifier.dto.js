const { htmlExtractItem, htmltoList } = require('../../extensions')

module.exports = item => ({
  identifier: item.Identifier,
  type: item.Type,
  name: item.Name,
  score: item.Score || 0,
  semesters: item.Semesters,
  description: htmlExtractItem(item.Description),
  krotonId: item.KrotonId,
  image: item.Image,
  aboutCourseCall: htmlExtractItem(item.AboutCourseCall),
  aboutCourseDescription: htmlExtractItem(item.AboutCourseDescription),
  courseTargetCall: htmlExtractItem(item.CourseTargetCall),
  courseTargetDescription: htmltoList(item.CourseTargetDescription),
  courseSubjectsCall: htmlExtractItem(item.CourseSubjectsCall),
  courseSubjectsDescription: htmltoList(item.CourseSubjectsDescription),
  marketCall: item.MarketCall || '',
  marketDescription: htmlExtractItem(item.MarketDescription),
  relatedCourses: item.RelatedCourses.length
    ? item.RelatedCourses.map(r => ({
      identifier: r.Identifier,
      name: r.Name,
      type: r.Type,
      semesters: r.Semesters,
      image: r.Image,
      score: r.Score,
      priceFrom: r.PriceFrom,
      priceTo: r.PriceTo,
      averageSalary: r.AverageSalary
    }))
    : [],
  averageSalaries: item.AverageSalaries || []
})
