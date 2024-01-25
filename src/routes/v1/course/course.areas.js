const express = require('express')
const router = express.Router()

const CourseController = require('../../../controllers/v1/course.controller')
const TrackMiddleware = require('../../../middlewares/trackMiddleware')

router.get(
  '/areas',
  TrackMiddleware.tracking,
  CourseController.getCourseAreas
  // #swagger.tags = ['Course']
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
