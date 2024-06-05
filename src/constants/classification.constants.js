const CLASSIFICATION_TYPE = {
  STUDENT: 'STUDENT',
  ENROLLMENT: 'ENROLLMENT',
  DISQUALIFIED: 'DISQUALIFIED',
  ABSENT: 'ABSENT',
}

const CLASSIFICATION_OPTIONS = {
  ALUNO: 'ALUNO',
  INSCRITO: 'INSCRITO',
  INSCRITO_VG_ONLINE: 'INSCRITO VG ONLINE',
  CONVOCADO: 'CONVOCADO',
  DESCLASSIFICADO: 'DESCLASSIFICADO',
  DESCLASSIFICADO_POR_NOTA: 'DESCLASSIFICADO POR NOTA',
  ABSENT: 'ABSENT',
}

const STUDENT = [CLASSIFICATION_OPTIONS.ALUNO]

const ENROLLMENT = [
  CLASSIFICATION_OPTIONS.INSCRITO,
  CLASSIFICATION_OPTIONS.INSCRITO_VG_ONLINE,
  CLASSIFICATION_OPTIONS.CONVOCADO,
]

const DISQUALIFIED = [
  CLASSIFICATION_OPTIONS.DESCLASSIFICADO,
  CLASSIFICATION_OPTIONS.DESCLASSIFICADO_POR_NOTA,
]

const ABSENT = [CLASSIFICATION_OPTIONS.ABSENT]

module.exports = {
  CLASSIFICATION_TYPE,
  STUDENT,
  ENROLLMENT,
  DISQUALIFIED,
  ABSENT,
}
