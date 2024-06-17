const Validator = require('../validator')
const constants = require('../../constants/enrollment.constants')
const { STATUS } = require('../../constants/status.constants')

module.exports = {
  requestValidate(model = {}) {
    const contract = new Validator()

    contract.isRequired(
      model.processamento?.status,
      constants.REQUIRED_STATUS.code,
      constants.REQUIRED_STATUS.message
    )

    contract.isEqual(
      model.processamento?.status,
      STATUS.SUCCESS,
      constants.INVALID_STATUS.code,
      constants.INVALID_STATUS.message
    )

    contract.isRequired(
      model.inscricao?.dataInscricao,
      constants.REQUIRED_ENROLLMENT_DATE.code,
      constants.REQUIRED_ENROLLMENT_DATE.message
    )

    contract.isRequired(
      model.inscricao?.classificacao?.descricao,
      constants.REQUIRED_CLASSIFICATION.code,
      constants.REQUIRED_CLASSIFICATION.message
    )

    contract.isRequired(
      model.inscricao?.ofertas?.primeiraOpcao?.dsModalidade,
      constants.REQUIRED_MODALITY.code,
      constants.REQUIRED_MODALITY.message
    )

    contract.isRequired(
      model.inscricao?.ofertas?.primeiraOpcao?.dsTipoCurso,
      constants.REQUIRED_TYPE_COURSE.code,
      constants.REQUIRED_TYPE_COURSE.message
    )

    contract.isRequired(
      model.inscricao?.ofertas?.primeiraOpcao?.dsNivelAcademico,
      constants.REQUIRED_TECHNICAL_COURSE.code,
      constants.REQUIRED_TECHNICAL_COURSE.message
    )

    contract.isRequired(
      model.inscricao?.businessKey,
      constants.REQUIRED_BUSINESS_KEY.code,
      constants.REQUIRED_BUSINESS_KEY.message
    )

    return contract
  },
}
