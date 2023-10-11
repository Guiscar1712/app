module.exports = class ExamService {
  constructor({ LoggerService, ExamStartService, ExamFinalizeService }) {
    this.LoggerService = LoggerService
    this.ExamStartService = ExamStartService
    this.ExamFinalizeService = ExamFinalizeService
  }

  start = async (subscriptionKey) => {
    return await this.ExamStartService.start(subscriptionKey)
  }

  finalize = async (subscriptionKey, model) => {
    return await this.ExamFinalizeService.finalize(subscriptionKey, model)
  }
}
