const classificationEnum = require('../../enum/Classification')

function toDto (item) {
  const { matricula, inscricao, dadosPessoais } = item

  if (!inscricao || !inscricao.ofertas || !inscricao.ofertas.primeiraOpcao || !inscricao.ofertas.primeiraOpcao.dsCurso) {
    return
  }

  const course = inscricao?.ofertas?.primeiraOpcao
  const courseName = getCourseName(course.dsCurso)
  const registrationEnem = inscricao?.enem?.utilizar

  const classification = inscricao?.classificacao?.descricao

  const { registration, descriptionRegistration } = getClassification(classification, registrationEnem)

  const registrationPayment = (matricula?.pagamento?.isento || matricula?.pagamento?.pago)

  const formOfEntry = getEntry(inscricao?.tipoIngresso, registrationEnem)

  return {
    subscriptionKey: inscricao?.businessKey,
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

function getEntry (entry, registrationEnem) {
  if (registrationEnem) {
    return 'Enem'
  }

  switch (entry) {
    case 'VESTIBULAR':
      return 'Vestibular online'

    case 'ENEM':
      return 'Enem'

    default:
      return 'Vestibular online'
  }
}

function getCourseName (courseName) {
  if (!courseName) {
    return courseName
  }

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
      return setClassification(classificationEnum.SUBSCRIPTION, 'Matriculado')

    case 'Convocado':
      return setClassification(classificationEnum.APPROVED, 'Aprovado')

    case 'Inscrito VG Online':
      return setClassification(classificationEnum.ONLINEEXAM, 'Vestibular online')

    case 'Desclassificado':
      return setClassification(classificationEnum.DISQUALIFIED, 'Desclassificado')

    case 'Ausente':
      return setClassification(classificationEnum.ABSENT, 'Ausente')

    case 'Inscrito':
      return exanOrEnem(registrationEnem)

    default:
      return setClassification(0, '')
  }
}

function setClassification (registration, description) {
  return { registration, descriptionRegistration: description }
}

function exanOrEnem (registrationEnem) {
  if (registrationEnem) {
    return setClassification(classificationEnum.ENEM, 'Inscrito')
  }
  return setClassification(classificationEnum.EXAM, 'Vestibular online')
}

module.exports = (item) => {
  if (Array.isArray(item)) {
    const courses = []

    item.forEach(element => {
      const course = toDto(element)
      if (course) {
        courses.push(course)
      }
    })

    return courses
  }
  return toDto(item)
}
