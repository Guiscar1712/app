const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })
const outputFile = './swagger-output.json'
const endpointsFiles = ['../app.js']
const doc = require('./swagger.doc')

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../server')
})
