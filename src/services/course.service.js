const axios = require('axios').create({ timeout: 1000000 })
const { getCourseIdentifierDTO, getCourseDto, getCourseAreasDto } = require('../dto/course')

module.exports = class CourseService {
  static async getCourses () {
    return (
      await axios.get(`${process.env.KROTON_API_BASE_URL}/cursos/origem/app`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY
        }
      })
    ).data
  }

  static async getCourse ({ identifier }) {
    const item = (
      await axios.get(
        `${process.env.KROTON_API_BASE_URL}/cursos/${identifier}/complete`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY
          }
        }
      )
    ).data

    return getCourseIdentifierDTO(item)
  }

  static async getCourseTrending () {
    // const params = {
    //   highlighted: true,
    //   limit: 10
    // }

    const params = {
      limit: 10
    }

    const courses = await this.getCourseFilter(params)

    return courses
  }

  static async getCourseMostWanted () {
    // const params = {
    //   sort: 'visits',
    //   limit: 10
    // }

    const params = {
      limit: 10
    }

    const courses = await this.getCourseFilter(params)

    return courses
  }

  static async getCourseStudyAtHome () {
    const params = {
      modality: 3,
      limit: 10
    }

    const courses = await this.getCourseFilter(params)

    return courses
  }

  static async getCourseHigherWages () {
    const params = {
      sort: 'salary',
      limit: 10
    }

    const courses = await this.getCourseFilter(params)

    return courses
  }

  static async findCourses (query) {
    const params = {
      search: query.search,
      area: query.area,
      modality: query.modality,
      sort: query.sort || 'visits',
      limit: query.limit || 10
    }

    const courses = await this.getCourseFilter(params)

    return courses
  }

  static async getCourseFilter (params) {
    const item = (
      await axios.get(
        `${process.env.KROTON_API_BASE_URL}/cursos/filter`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY
          },
          params
        }
      )
    ).data

    return getCourseDto(item)
  }

  static async getCourseAreas () {
    const item = (
      await axios.get(
        `${process.env.KROTON_API_BASE_URL}/course-areas`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY
          }
        }
      )
    ).data

    return getCourseAreasDto(item)
  }
}
