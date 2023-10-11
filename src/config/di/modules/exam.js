const { asClass } = require('awilix')

const ExamService = require('../../../services/exam')
const ExamStartService = require('../../../services/exam/startExam')
const ExamFinalizeService = require('../../../services/exam/finalizeExam')
const ExamController = require('../../../controllers/v1/exam.controller')

module.exports = {
  ExamService: asClass(ExamService),
  ExamStartService: asClass(ExamStartService),
  ExamFinalizeService: asClass(ExamFinalizeService),
  ExamController: asClass(ExamController),
}
