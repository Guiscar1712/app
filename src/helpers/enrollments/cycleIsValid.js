const config = require('../../utils/config')
const ingresso = config.kroton.ingresso

const classroomCourse = ['PRESENCIAL']
const distanceCourse = ['A DISTÂNCIA', 'EAD']
const blendedCourse = ['SEMIPRESENCIAL']

const ptcSystemOptions = ['SAP', 'ATHENAS']

module.exports = (classification, data) => {
  if (classification === 'STUDENT') {
    return true
  }

  const system = data.sistema.toUpperCase()
  if (ptcSystemOptions.includes(system)) {
    return true
  }

  const enrollmentDate = new Date(data.inscricao.dataInscricao)
  const modality =
    data.inscricao.ofertas.primeiraOpcao.dsModalidade.toUpperCase()

  if (
    classroomCourse.includes(modality) &&
    enrollmentDate >= ingresso.classroomCourseCycleDate
  ) {
    return true
  }

  if (
    distanceCourse.includes(modality) &&
    enrollmentDate >= ingresso.distanceCourseCycleDate
  ) {
    return true
  }

  if (
    blendedCourse.includes(modality) &&
    enrollmentDate >= ingresso.blendedCourseCycleDate
  ) {
    return true
  }

  return false
}
