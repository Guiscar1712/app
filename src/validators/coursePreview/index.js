const Validator = require('../validator')
const constantsUser = require('../../constants/user.constants')
const constantsCoursePreview = require('../../constants/coursePreview.constants')

module.exports = {
  validate(model) {
    const contract = new Validator()
    contract.isRequired(
      model.name,
      constantsUser.REQUIRED_NAME.code,
      constantsUser.REQUIRED_NAME.message
    )

    contract.isRequired(
      model.phone,
      constantsUser.REQUIRED_CELLPHONE.code,
      constantsUser.REQUIRED_CELLPHONE.message
    )

    contract.isEmail(
      model.email,
      constantsUser.INVALID_EMAIL.code,
      constantsUser.INVALID_EMAIL.message
    )

    return contract
  },
  validateCoursePreviewLeadId(model) {
    const contract = new Validator()
    contract.isRequired(
      model.coursePreviewLeadId,
      constantsCoursePreview.REQUIRED_COURSE_PREVIEW_LEAD_ID.code,
      constantsCoursePreview.REQUIRED_COURSE_PREVIEW_LEAD_ID.message
    )

    return contract
  },
}
