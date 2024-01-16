module.exports = function swaggerConfig(app) {
  const docs =
    process.env.NODE_ENV == 'homolog' || process.env.NODE_ENV == 'development'

  if (docs) {
    const swaggerUi = require('swagger-ui-express')
    const swaggerFile = require('./swagger-output.json')

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  return app
}
