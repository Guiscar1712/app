const CourseService = require('../services/course.service')

module.exports = class CourseController {
  static async courses (request, response, next) {
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

  static async getCourse (request, response, next) {
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

  static async getCourseTrending (request, response, next) {
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

  static async getCourseMostWanted (request, response, next) {
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

  static async getCourseStudyAtHome (request, response, next) {
    try {
      const area = request.params.area
      const modality = request.params.modality
      const courses = await CourseService.getCourseStudyAtHome({ area, modality })
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

  static async getCourseHigherWages (request, response, next) {
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

  static async getCourseAreas (request, response, next) {
    try {
      const courses = await CourseService.getCourseAreas()
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
}
