const { asClass } = require('awilix')

const PageSectionFeatureRepository = require('../../../repositories/v1/pageSectionFeature')
const PageSectionFeatureService = require('../../../services/pageSectionFeature/pageSectionFeature')
const SettingsController = require('../../../controllers/v1/pageSectionFeature.controller')

module.exports = {
  PageSectionFeatureRepository: asClass(PageSectionFeatureRepository),
  PageSectionFeatureService: asClass(PageSectionFeatureService),
  SettingsController: asClass(SettingsController),
}
