const express = require('express')
const router = express.Router()
const errorHandler = require('../../middlewares/errorHandler')

router.use('/user', require('./user'))
router.use('/auth', require('./auth'))
router.use('/enrollment', require('./enrollment'))
router.use('/payment', require('./payment'))
router.use('/contract', require('./contract'))
router.use('/exam', require('./exam'))
router.use('/address', require('./address'))

router.use('/course-preview-lead', require('./coursePreviewLead.route'))
router.use('/settings', require('./pageSectionFeature.route'))

//Legado => Sem Logs
router.use('/notification', require('./notification'))
router.use('/course', require('./course'), errorHandler)

module.exports = router
