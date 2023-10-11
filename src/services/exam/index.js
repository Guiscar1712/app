module.exports = class ExamService {
  constructor({ LoggerService, ExamStartService }) {
    this.LoggerService = LoggerService
    this.ExamStartService = ExamStartService
  }

  start = async (subscriptionKey) => {
    return await this.ExamStartService.start(subscriptionKey)
  }
}
