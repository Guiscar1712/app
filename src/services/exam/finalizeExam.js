const { getExamInfo, getModel } = require('../../dto/exam')

module.exports = class ExamFinilizeService {
  constructor({ IngressoClient, LoggerService }) {
    this.LoggerService = LoggerService
    this.IngressoClient = IngressoClient
  }

  finalize = async (subscriptionKey, model) => {
    const step = this.LoggerService.addStepStepTrace('ExamServiceFinalize')

    const subscriptionKeyEncode = Buffer.from(subscriptionKey, 'utf8').toString(
      'base64'
    )
    const modelDto = getModel(model)
    await this.IngressoClient.provaFinalizar(subscriptionKeyEncode, modelDto)

    await this.IngressoClient.provaElegibilidade(subscriptionKey)

    const data = await this.IngressoClient.provaConsulta(subscriptionKeyEncode)
    const dataDto = getExamInfo(data)

    this.LoggerService.finalizeStep(step.value, step.key, data)
    return dataDto
  }
}
