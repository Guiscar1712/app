const { courseAreas } = require('../../services/courses')
const cacheInMemory = require('../../utils/cacheInMemory')

module.exports = class CourseController {
  static async getCourseAreas (request, response, next) {
    try {
      const data = await cacheInMemory(courseAreas, null)

      response.json(data)
    } catch (error) {
      next(error)
    }
  }
}
