const cacheInMemory = require('../../utils/cacheInMemory')
const { NotFoundError } = require( '../../utils/errors' )
const constant = require('../../constants/featureContent.constants')
module.exports = class PageSectionFeatureController {
  constructor({ PageSectionFeatureService, LoggerService }) {
    this.LoggerService = LoggerService
    this.PageSectionFeatureService = PageSectionFeatureService
  }

  getPage = async (request, response, next) => {
    const step = this.LoggerService.addStep('PageSectionFeatureControllerGet ')
    try {
      
      const page  = request.params.page
      const data = await this.PageSectionFeatureService.getPage(page)

      if(!data){
        throw new NotFoundError('Registro não encontrado!', [constant.NOT_FOUND], constant.CODE)
      }

      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }

  getPages = async (request, response, next) => {
    const step = this.LoggerService.addStep('PageSectionFeatureControllerGet ')
    try {
      const data = await this.PageSectionFeatureService.getPages()

      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }
}
