const express = require('express')
const router = express.Router()

router.use('/', require('./legacy'))
router.use(
  '/v1',
  require('./v1')
  /*  #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/response400" },
        description: "Invalid parameters" } */

  /*  #swagger.responses[500] = { 
        schema: { $ref: "#/definitions/response500" },
        description: "Server errors" } */
)
router.use(
  '/v2',
  require('./v2')
  /*  #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/response400" },
        description: "Invalid parameters" } */

  /*  #swagger.responses[500] = { 
        schema: { $ref: "#/definitions/response500" },
        description: "Server errors" } */
)

module.exports = router
