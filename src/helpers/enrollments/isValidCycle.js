const {
  CLASSIFICATION_TYPE,
} = require('../../constants/classification.constants')
const {
  CLASSROOM_COURSES,
  DISTANCE_COURSES,
  BLENDED_COURSES,
} = require('../../constants/course.constants')
const { PTC_SYSTEM_OPTIONS } = require('../../constants/system.constants')
const config = require('../../utils/config')
const enrollmentConstants = require('../../constants/enrollment.constants')
const Validator = require('../../validators/validator')

const ingresso = config.kroton.ingresso

module.exports = (classification, data) => {
  const contract = new Validator()

  if (classification === CLASSIFICATION_TYPE.STUDENT) {
    return contract
  }

  const system = data.sistema.toUpperCase()
  if (PTC_SYSTEM_OPTIONS.includes(system)) {
    return contract
  }

  const enrollmentDate = new Date(data.inscricao.dataInscricao)
  const modality =
    data.inscricao.ofertas.primeiraOpcao.dsModalidade.toUpperCase()

  if (
    CLASSROOM_COURSES.includes(modality) &&
    enrollmentDate >= ingresso.classroomCourseCycleDate
  ) {
    return contract
  }

  if (
    DISTANCE_COURSES.includes(modality) &&
    enrollmentDate >= ingresso.distanceCourseCycleDate
  ) {
    return contract
  }

  if (
    BLENDED_COURSES.includes(modality) &&
    enrollmentDate >= ingresso.blendedCourseCycleDate
  ) {
    return contract
  }

  contract.errorsPush(enrollmentConstants.INVALID_CYCLE)

  return contract
}
