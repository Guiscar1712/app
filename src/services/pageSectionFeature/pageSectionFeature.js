const pageSectionFeatureDto = require('../../dto/pageSectionFeature/pageSectionFeature.dto')

module.exports = class PageSectionFeatureService {
  constructor({ PageSectionFeatureRepository, LoggerService }) {
    this.PageSectionFeatureRepository = PageSectionFeatureRepository
    this.LoggerService = LoggerService
  }

  getPage = async (page) => {
    const step = this.LoggerService.addStep('PageSectionFeatureServiceGet')
    try {
      const pageSectionFeature =
        await this.PageSectionFeatureRepository.findByPage(page)

      const data = pageSectionFeature?.[0] ? new pageSectionFeatureDto(pageSectionFeature?.[0]) : null

      step.value.addData(data)
      return data
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }

  getPages = async () => {
    const step = this.LoggerService.addStep('PageSectionFeatureServiceGet')
    try {
      const pageSectionFeature =
        await this.PageSectionFeatureRepository.findByPage()

      const data = []

      pageSectionFeature.forEach((element) => {
        data.push(new pageSectionFeatureDto(element))
      })

      step.value.addData(data)
      return data
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
