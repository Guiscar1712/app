const express = require('express')
const router = express.Router()

const CourseController = require('../../controllers/course.controller')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.get(
  '/courses',
  TrackMiddleware.tracking,
  CourseController.courses
  // #swagger.tags = ['Course']
  /*  #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/courses" },
        description: "successfully" } */
)
router.get(
  '/courses/:identifier',
  TrackMiddleware.tracking,
  CourseController.getCourse
  // #swagger.tags = ['Course']
  /*  #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/courses" },
        description: "successfully" } */
)
router.get(
  '/trending',
  TrackMiddleware.tracking,
  CourseController.getCourseTrending
  // #swagger.tags = ['Course']
  /*  #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/courses" },
        description: "successfully" } */
)
router.get(
  '/most-wanted',
  TrackMiddleware.tracking,
  CourseController.getCourseMostWanted
  // #swagger.tags = ['Course']
  /*  #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/courses" },
        description: "successfully" } */
)
router.get(
  '/study-at-home',
  TrackMiddleware.tracking,
  CourseController.getCourseStudyAtHome
  // #swagger.tags = ['Course']
  /*  #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/courses" },
        description: "successfully" } */
)
router.get(
  '/higher-wages',
  TrackMiddleware.tracking,
  CourseController.getCourseHigherWages
  // #swagger.tags = ['Course']
  /*  #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/courses" },
        description: "successfully" } */
)

router.get(
  '/find',
  TrackMiddleware.tracking,
  CourseController.findCourses
  // #swagger.tags = ['Course']
  /*  #swagger.parameters['search'] = {
            in: 'query',
            description: 'Course name',
            required: true
    } */
  /*  #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/courses" },
        description: "successfully" } */
)

router.get(
  '/areas',
  TrackMiddleware.tracking,
  CourseController.getCourseAreas
  // #swagger.tags = ['Course']
  // #swagger.deprecated = true
  /*  #swagger.parameters['search'] = {
            in: 'query',
            description: 'Course name',
            required: true
    } */
  /*  #swagger.responses[200] = { 
        schema: [{ "id": 13,
	                	"name": "Alimentos e Bebidas",
	                	"icon": "fastfood_outlined",
	                	"identifier": "alimentos-e-bebidas",
	                	"image": "shutterstock_672436372_1_b837e5291a.jpg"
	                }],
        description: "successfully" } */
)

module.exports = router
