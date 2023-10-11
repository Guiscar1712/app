const { getTheme } = require('../../dto/exam')

module.exports = class Exam {
  constructor({ IngressoClient, LoggerService }) {
    this.LoggerService = LoggerService
    this.IngressoClient = IngressoClient
  }

  start = async (subscriptionKey) => {
    const step = this.LoggerService.addStepStepTrace('ExamControllerStart')
    const subscriptionKeyEncode = Buffer.from(subscriptionKey, 'utf8').toString(
      'base64'
    )
    const data = await this.IngressoClient.provaInicar(subscriptionKeyEncode)
    const dataDto = getTheme(data)
    this.LoggerService.finalizeStep(step.value, step.key, dataDto)
    return dataDto
  }
}
