const { asClass } = require('awilix')

const EnrollmentList = require('../../../services/enrollments/enrollmentsList')
const EnrollmentDetails = require('../../../services/enrollments/enrollmentDetails')
const EnrollmentsController = require('../../../controllers/v1/enrollments.controller')

module.exports = {
  EnrollmentList: asClass(EnrollmentList),
  EnrollmentDetails: asClass(EnrollmentDetails),
  EnrollmentsController: asClass(EnrollmentsController),
}
