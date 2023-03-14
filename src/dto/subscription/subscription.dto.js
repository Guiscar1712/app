const classificationEnum = require('../../enum/Classification')

function toDto (item) {
  const { matricula, inscricao, dadosPessoais } = item

  const course = inscricao?.ofertas?.primeiraOpcao
  const courseName = getCourseName(course.dsCurso)
  const registrationEnem = inscricao.enem?.utilizar

  const classification = inscricao.classificacao?.descricao

  const { registration, descriptionRegistration } = getClassification(classification, registrationEnem)

  const registrationPayment = (matricula.pagamento?.isento || matricula.pagamento?.pago)

  const formOfEntry = getEntry(inscricao.tipoIngresso)

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
    registrationPayment,
    monthlyPayment: course.vlMensalidadePara,
    descriptionRegistration,
    enem: registrationEnem,
    formOfEntry
  }
}

function getEntry (entry) {
  switch (entry) {
    case 'VESTIBULAR':
      return 'Vestibular'

    case 'ENEM':
      return 'Enem'

    default:
      break
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

function getClassification (classification, registrationEnem) {
  switch (classification) {
    case 'Aluno':
      return { registration: classificationEnum.SUBSCRIPTION, descriptionRegistration: 'Matriculado' }

    case 'Convocado':
      return { registration: classificationEnum.APPROVED, descriptionRegistration: 'Aprovado' }

    case 'Inscrito VG Online':
      return { registration: classificationEnum.ONLINEEXAM, descriptionRegistration: 'Vestibular online' }

    case 'Desclassificado':
      return { registration: classificationEnum.DISQUALIFIED, descriptionRegistration: 'Desclassificado' }

    case 'Inscrito':
      return exanOrEnem(registrationEnem)

    default:
      return { registration: 0, descriptionRegistration: '' }
  }
}

function exanOrEnem (registrationEnem) {
  if (registrationEnem) {
    return { registration: classificationEnum.ENEM, descriptionRegistration: 'Inscrito' }
  }
  return { registration: classificationEnum.EXAM, descriptionRegistration: 'Vestibular' }
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
