const { findCourse, findCourseAreas } = require('../../clients/facelift')
const { CourseAreaResponse } = require('../../dto/course')
const retry = require('../../utils/retry')

async function courseAreas () {
  const courses = await retry(findCourse, null)

  if (!courses || courses.length === 0) {
    return []
  }

  const courseAreas = courses.reduce((result, course) => {
    const area = course.Area.Name
    if (!result.find(f => f === area)) {
      result.push(area)
    }
    return result
  }, [])

  if (courseAreas.length === 0) {
    return []
  }

  const areas = await retry(findCourseAreas, null)

  const filterAreas = areas.filter(f => courseAreas.includes(f.Name))

  const response = []
  filterAreas.forEach(element => {
    response.push(new CourseAreaResponse(element))
  })

  return response
}

module.exports = courseAreas
