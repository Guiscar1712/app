const {
  htmlExtractItem,
  htmltoList
} = require('../../extensions')

module.exports = (item) => ({
  Identifier: item.Identifier,
  Type: item.Type,
  Name: item.Name,
  Score: item.Score || 0,
  Semesters: item.Semesters,
  Description: htmlExtractItem(item.Description, 'p'),
  KrotonId: item.KrotonId,
  Image: item.Image,
  AboutCourseCall: htmlExtractItem(item.AboutCourseCall, 'p'),
  AboutCourseDescription: htmlExtractItem(item.AboutCourseDescription, 'p'),
  CourseTargetCall: htmlExtractItem(item.CourseTargetCall, 'p'),
  CourseTargetDescription: htmltoList(item.CourseTargetDescription),
  CourseSubjectsCall: htmlExtractItem(item.CourseSubjectsCall, 'p'),
  CourseSubjectsDescription: htmltoList(item.CourseSubjectsDescription),
  MarketCall: item.MarketCall || '',
  MarketDescription: htmlExtractItem(item.MarketDescription, 'p'),
  RelatedCourses: item.RelatedCourses || [],
  AverageSalaries: item.AverageSalaries || []
})
