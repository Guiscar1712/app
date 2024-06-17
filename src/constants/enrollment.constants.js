const CODE = 'ENROLMENT-6600'

const REQUIRED_STATUS = { code: 6610, message: 'Status nulo' }
const REQUIRED_ENROLLMENT_DATE = { code: 6611, message: 'Data inscrição nulo' }
const REQUIRED_CLASSIFICATION = {
  code: 6612,
  message: 'Classificação não esperada ou nula',
}
const REQUIRED_MODALITY = {
  code: 6613,
  message: 'Modalidade não esperada ou nula',
}

const REQUIRED_TYPE_COURSE = {
  code: 6614,
  message: 'Tipo curso não esperado ou nulo',
}

const REQUIRED_TECHNICAL_COURSE = {
  code: 6615,
  message: 'Nivel academico não esperado ou nulo',
}

const REQUIRED_BUSINESS_KEY = {
  code: 6616,
  message: 'BusinessKey nulo',
}

const INVALID_STATUS = { code: 6617, message: 'Status inválido' }

const INVALID_TYPE_COURSE = { code: 6618, message: 'Tipo curso inválido' }

const INVALID_TECHNICAL_COURSE = {
  code: 6619,
  message: 'Nivel academico inválido',
}

const INVALID_CYCLE = { code: 6620, message: 'Fora de ciclo' }

module.exports = {
  CODE,
  REQUIRED_STATUS,
  REQUIRED_ENROLLMENT_DATE,
  REQUIRED_CLASSIFICATION,
  REQUIRED_MODALITY,
  REQUIRED_TYPE_COURSE,
  REQUIRED_TECHNICAL_COURSE,
  REQUIRED_BUSINESS_KEY,
  INVALID_STATUS,
  INVALID_TYPE_COURSE,
  INVALID_TECHNICAL_COURSE,
  INVALID_CYCLE,
}
