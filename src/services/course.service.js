const axios = require('axios').create({ timeout: 1000000 })
const coursePreviewRepository = require('../repositories/v1/coursePreviewRepository')
const {
  getCourseIdentifierDTO,
  getCourseDto,
  getCourseAreasDto,
} = require('../dto/course')

module.exports = class CourseService {
  static async getCourses() {
    const data = (
      await axios.get(`${process.env.KROTON_API_BASE_URL}/cursos/origem/app`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY,
        },
      })
    ).data

    const identifiers = data
      .map((m) => {
        return m.identifier
      })
      .join(',')

    const coursesPreview = coursePreviewRepository.findByIn(identifiers)

    const courses = data.map((m) => {
      const hasPreview = !!coursesPreview.find(
        (f) => f.identifier == m.identifier
      )

      return { ...m, coursePreview }
    })

    return data
  }

  static async getCourse({ identifier }) {
    const course = (
      await axios.get(
        `${process.env.KROTON_API_BASE_URL}/cursos/${identifier}/complete`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY,
          },
        }
      )
    ).data

    const coursesPreview = await coursePreviewRepository.findByIn(identifier)

     aindacourse.coursePreview = !!coursesPreview[0]
    course.coursePreviewURL = coursesPreview[0]?.url

    return getCourseIdentifierDTO(course)
  }

  static async getCourseTrending() {
    // const params = {
    //   highlighted: true,
    //   limit: 10
    // }

    const params = {
      limit: 10,
    }

    const courses = await this.getCourseFilter(params)

    return courses
  }

  static async getCourseMostWanted() {
    // const params = {
    //   sort: 'visits',
    //   limit: 10
    // }
    const params = {
      limit: 10,
    }

    const courses = await this.getCourseFilter(params)
    return courses
  }

  static async getCourseStudyAtHome() {
    const params = {
      modality: 3,
      limit: 10,
    }

    const courses = await this.getCourseFilter(params)

    return courses
  }

  static async getCourseHigherWages() {
    const params = {
      sort: 'salary',
      limit: 10,
    }

    const courses = await this.getCourseFilter(params)

    return courses
  }

  static async findCourses(query) {
    const params = {
      search: query.search,
      area: query.area,
      modality: query.modality,
      sort: query.sort || 'visits',
      limit: query.limit || 10,
    }

    // Remover apos ajuste do Strapi
    if (params.sort === 'visits') {
      delete params.sort
    }

    let filter = true
    if (
      (params.search === undefined || params.search === null) &&
      (params.area === undefined || params.area === null) &&
      (params.modality === undefined || params.modality === null)
    ) {
      filter = false
      params.limit = 20
    }
    // Remover apos ajuste do Strapi

    const courses = await this.getCourseFilter(params)

    if (!filter) {
      return courses.slice(10, 20)
    }
    return courses
  }

  static async getCourseFilter(params) {
    const item = (
      await axios.get(`${process.env.KROTON_API_BASE_URL}/cursos/filter`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY,
        },
        params,
      })
    ).data

    const coursesDto = getCourseDto(item)

    const identifiers = coursesDto
      .map((m) => {
        return m.identifier
      })
      .join(`','`)

    const coursesPreview = await coursePreviewRepository.findByIn(identifiers)

    const courses = coursesDto.map((m) => {
      const hasPreview = !!coursesPreview.find(
        (f) => f.identifier == m.identifier
      )

      return { ...m, coursePreview: hasPreview }
    })

    return courses
  }

  static async getCourseAreas() {
    const item = (
      await axios.get(`${process.env.KROTON_API_BASE_URL}/course-areas`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY,
        },
      })
    ).data

    return getCourseAreasDto(item)
  }
}
