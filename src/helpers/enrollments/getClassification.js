const {
  ENROLLMENT,
  DISQUALIFIED,
  CLASSIFICATION_TYPE,
  STUDENT,
} = require('../../constants/classification.constants')
const { COURSE_TYPES } = require('../../constants/course.constants')
const { STATUS } = require('../../constants/status.constants')

function isValid(data) {
  const { inscricao, processamento } = data

  if (processamento?.status?.toUpperCase() !== STATUS.SUCCESS) {
    return false
  }

  if (
    inscricao?.ofertas?.primeiraOpcao?.dsTipoCurso?.toUpperCase() ===
      COURSE_TYPES.TECNICAL_COURSE ||
    inscricao?.ofertas?.primeiraOpcao?.dsNivelAcademico?.toUpperCase() ===
      COURSE_TYPES.TECNICAL_COURSE
  ) {
    return false
  }

  const { ofertas } = inscricao

  const course = ofertas.primeiraOpcao
  if (!course) {
    return false
  }

  return true
}

module.exports = (data) => {
  if (!isValid(data)) {
    return STATUS.ERROR
  }

  const classificacao = data.inscricao.classificacao

  const classification = classificacao?.descricao?.toUpperCase()

  if (STUDENT.includes(classification)) {
    return CLASSIFICATION_TYPE.STUDENT
  }

  if (ENROLLMENT.includes(classification)) {
    return CLASSIFICATION_TYPE.ENROLLMENT
  }

  if (DISQUALIFIED.includes(classification)) {
    return CLASSIFICATION_TYPE.DISQUALIFIED
  }

  return CLASSIFICATION_TYPE.ABSENT
}
