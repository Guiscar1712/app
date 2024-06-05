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

const ingresso = config.kroton.ingresso

module.exports = (classification, data) => {
  if (classification === CLASSIFICATION_TYPE.STUDENT) {
    return true
  }

  const system = data.sistema.toUpperCase()
  if (PTC_SYSTEM_OPTIONS.includes(system)) {
    return true
  }

  const enrollmentDate = new Date(data.inscricao.dataInscricao)
  const modality =
    data.inscricao.ofertas.primeiraOpcao.dsModalidade.toUpperCase()

  if (
    CLASSROOM_COURSES.includes(modality) &&
    enrollmentDate >= ingresso.classroomCourseCycleDate
  ) {
    return true
  }

  if (
    DISTANCE_COURSES.includes(modality) &&
    enrollmentDate >= ingresso.distanceCourseCycleDate
  ) {
    return true
  }

  if (
    BLENDED_COURSES.includes(modality) &&
    enrollmentDate >= ingresso.blendedCourseCycleDate
  ) {
    return true
  }

  return false
}
