module.exports = class RegisterAppSaveService {
  constructor({ RegisterAppRepository, LoggerService }) {
    this.RegisterAppRepository = RegisterAppRepository
    this.LoggerService = LoggerService
  }

  save = async (token, userId) => {
    const step = this.LoggerService.addStep('RegisterAppSaveService')
    try {
      let data = await this.RegisterAppRepository.findBy({
        token,
        userId,
      })

      if (data) {
        data = await this.RegisterAppRepository.update(data.id)
      } else {
        data = await this.RegisterAppRepository.insert({
          token,
          userId,
        })
      }

      step.value.addData(data)

      return data
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
