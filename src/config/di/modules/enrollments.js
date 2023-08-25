const { asClass } = require('awilix')

const EnrollmentDetails = require('../../../services/enrollments/enrollmentDetails')
const EnrollmentsController = require('../../../controllers/v1/enrollments.controller')

module.exports = {
  EnrollmentDetails: asClass(EnrollmentDetails).scoped(),
  EnrollmentsController: asClass(EnrollmentsController).scoped()
}
