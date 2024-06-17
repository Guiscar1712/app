const {
  ENROLLMENT,
  DISQUALIFIED,
  CLASSIFICATION_TYPE,
  STUDENT,
} = require('../../constants/classification.constants')
const { COURSE_TYPES } = require('../../constants/course.constants')
const { STATUS } = require('../../constants/status.constants')
const enrollmentConstants = require('../../constants/enrollment.constants')
const Validator = require('../../validators/validator')

function isValid(data) {
  const contract = new Validator()

  const { inscricao, processamento } = data

  if (processamento?.status?.toUpperCase() !== STATUS.SUCCESS) {
    contract.errorsPush(enrollmentConstants.INVALID_STATUS)
  }

  const primeiraOpcao = inscricao.ofertas?.primeiraOpcao

  if (
    primeiraOpcao?.dsTipoCurso?.toUpperCase() === COURSE_TYPES.TECHNICAL_COURSE
  ) {
    contract.errorsPush(enrollmentConstants.INVALID_TYPE_COURSE)
  }

  if (
    primeiraOpcao?.dsNivelAcademico?.toUpperCase() ===
    COURSE_TYPES.TECHNICAL_COURSE
  ) {
    contract.errorsPush(enrollmentConstants.INVALID_TECHNICAL_COURSE)
  }

  return contract
}

module.exports = (data) => {
  const contract = isValid(data)
  if (!contract.isValid()) {
    data.errors = {
      status: STATUS.ERROR,
      code: enrollmentConstants.CODE,
      errors: contract.errors(),
    }

    return data
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
