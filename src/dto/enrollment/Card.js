const Util = require('../../utils/util')
const { EnrollmentsHelpers } = require('../../helpers')

class EnrollmentCardDto {
  constructor(data) {
    const classification = EnrollmentsHelpers.getClassification(data)
    if (classification == 'ERROR' || classification != 'STUDENT') {
      this.status = 'ERROR'
      return
    }

    const { inscricao, matricula, dadosPessoais } = data
    const { ofertas } = inscricao

    const course = ofertas.primeiraOpcao
    if (!course) {
      this.status = 'ERROR'
      return
    }

    this.code = matricula?.ra
    this.name = dadosPessoais?.nome
    this.email = dadosPessoais?.email
    this.document = dadosPessoais?.cpf
    this.institution = 'Anhanguera Educacional'

    this.setCourseName(course.dsCurso)
    this.setBirthday(dadosPessoais)
    this.setExpirationDate()
  }

  setBirthday(dadosPessoais) {
    const date = new Date(dadosPessoais?.dataNascimento)
    this.birthday = Util.dateToString(date)
  }

  setCourseName(courseName) {
    if (!courseName) {
      this.courseName = ''
    }

    const courseNameSplit = courseName.split(' - ')

    if (courseNameSplit.length <= 1) {
      this.courseName = ''
    }

    courseNameSplit.splice(courseNameSplit.length - 1, 1)

    this.courseName = courseNameSplit.join(' - ')
  }

  setExpirationDate() {
    const dateNow = new Date()
    const year = dateNow.getFullYear()
    const month = dateNow.getMonth() + 1
    const expirationMonth = month <= 6 ? 6 : 12

    this.expirationDate = `${expirationMonth}/${year}`
  }
}

module.exports = EnrollmentCardDto
