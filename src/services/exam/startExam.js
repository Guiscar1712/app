const { getTheme } = require('../../dto/exam')

module.exports = class ExamStartService {
  constructor({ IngressoClient, LoggerService }) {
    this.LoggerService = LoggerService
    this.IngressoClient = IngressoClient
  }

  start = async (subscriptionKey) => {
    const step = this.LoggerService.addStep('ExamServiceStart')
    const subscriptionKeyEncode = Buffer.from(subscriptionKey, 'utf8').toString(
      'base64'
    )
    const data = await this.IngressoClient.provaInicar(subscriptionKeyEncode)
    const dataDto = getTheme(data)

    step.value.addData(dataDto)
    this.LoggerService.finalizeStep(step)
    return dataDto
  }
}
