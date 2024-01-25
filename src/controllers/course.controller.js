const CourseService = require('../services/course.service')
const cacheInMemory = require('../utils/cacheInMemory')
const { courseAreas } = require('../services/courses')

module.exports = class CourseController {
  static async courses(request, response, next) {
    try {
      const courses = await CourseService.getCourses()
      response.json(courses)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        response.status(401).json(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
    }
  }

  static async getCourse(request, response, next) {
    try {
      const identifier = request.params.identifier
      const courses = await CourseService.getCourse({ identifier })
      response.json(courses)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        response.status(401).json(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
    }
  }

  static async getCourseTrending(request, response, next) {
    try {
      const courses = await CourseService.getCourseTrending()
      response.json(courses)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        response.status(401).json(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
    }
  }

  static async getCourseMostWanted(request, response, next) {
    try {
      const courses = await CourseService.getCourseMostWanted()
      response.json(courses)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        response.status(401).json(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
    }
  }

  static async getCourseStudyAtHome(request, response, next) {
    try {
      const courses = await CourseService.getCourseStudyAtHome()
      response.json(courses)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        response.status(401).json(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
    }
  }

  static async getCourseHigherWages(request, response, next) {
    try {
      const courses = await CourseService.getCourseHigherWages()
      response.json(courses)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        response.status(401).json(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
    }
  }

  static async findCourses(request, response, next) {
    
    try {
      const query = request.query
      const courses = await CourseService.findCourses(query)
      response.json(courses)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        response.status(401).json(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
    }
  }

  static async getCourseAreas(request, response, next) {

    try {
      const data = await cacheInMemory(courseAreas, null)
      response.json(data)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        response.status(401).json(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
    }
  }
}
