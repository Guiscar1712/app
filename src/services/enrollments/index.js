const searchForEnrollments = require('./searchForEnrollments')
const enrollmentDetails = require('./enrollmentDetails')
const { contractsList } = require('./contractsList')
const contractByContractId = require('./contractByContractId')
const contractAccepted = require('./contractAccepted')

module.exports = {
  searchForEnrollments,
  enrollmentDetails,
  contractsList,
  contractByContractId,
  contractAccepted
}
