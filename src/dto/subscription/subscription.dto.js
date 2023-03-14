const classificationEnum = require('../../enum/Classification')

function toDto (item) {
  const { inscricao, dadosPessoais } = item

  const course = inscricao?.ofertas?.primeiraOpcao
  const courseName = getCourseName(course.dsCurso)
  const registrationEnem = inscricao.enem?.utilizar

  const classification = inscricao.classificacao?.descricao

  const { registration, descriptionRegistration } = toClassification(classification, registrationEnem)

  return {
    courseTypeName: course.dsTipoCurso,
    courseName,
    studentCode: dadosPessoais.ra,
    studentName: dadosPessoais.nome,
    studentEmail: dadosPessoais.email,
    unit: course.dsUnidade,
    modality: course.dsModalidade,
    shift: course.dsTurno,
    registration,
    monthlyPayment: course.vlMensalidadePara,
    descriptionRegistration,
    enem: registrationEnem
  }
}

function getCourseName (courseName) {
  const courseNameSplit = courseName.split(' - ')

  if (courseNameSplit.length <= 1) {
    return courseName
  }

  courseNameSplit.splice(courseNameSplit.length - 1, 1)

  return courseNameSplit.join(' - ')
}

function toClassification (classification, registrationEnem) {
  switch (classification) {
    case 'Aluno':
      return { registration: classificationEnum.SUBSCRIPTION, descriptionRegistration: 'Matriculado' }

    case 'Convocado':
      return { registration: classificationEnum.APPROVED, descriptionRegistration: 'Aprovado' }

    case 'Inscrito VG Online':
      return { registration: classificationEnum.ONLINEEXAM, descriptionRegistration: 'Vestibular online' }

    case 'Inscrito':
      return exanOrEnem(registrationEnem)

    default:
      break
  }
}

function exanOrEnem (registrationEnem) {
  if (registrationEnem) {
    return { registration: classificationEnum.ENEM, descriptionRegistration: 'Inscrito' }
  }
  return { registration: classificationEnum.EXAM, descriptionRegistration: 'Vestibular presencial' }
}

module.exports = (item) => {
  if (Array.isArray(item)) {
    const courses = []

    item.forEach(element => {
      courses.push(toDto(element))
    })

    return courses
  }
  return toDto(item)
}
