const { asClass } = require('awilix')

const CoursePreviewLeadRepository = require('../../../repositories/v1/coursePreviewLeadRepository')
const CoursePreviewLeadService = require('../../../services/coursePreviewLead')
const CoursePreviewLeadStartService = require('../../../services/coursePreviewLead/start')
const CoursePreviewLeadFinishService = require('../../../services/coursePreviewLead/finish')
const CoursePreviewLeadController = require('../../../controllers/v1/coursePreviewLead.controller')

module.exports = {
  CoursePreviewLeadRepository: asClass(CoursePreviewLeadRepository),
  CoursePreviewLeadService: asClass(CoursePreviewLeadService),
  CoursePreviewLeadStartService: asClass(CoursePreviewLeadStartService),
  CoursePreviewLeadFinishService: asClass(CoursePreviewLeadFinishService),
  CoursePreviewLeadController: asClass(CoursePreviewLeadController),
}
