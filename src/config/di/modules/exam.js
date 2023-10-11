const { asClass } = require('awilix')

const ExamService = require('../../../services/exam')
const ExamStartService = require('../../../services/exam/startExam')
const ExamController = require('../../../controllers/v1/exam.controller')

module.exports = {
  ExamService: asClass(ExamService),
  ExamStartService: asClass(ExamStartService),
  ExamController: asClass(ExamController),
}
