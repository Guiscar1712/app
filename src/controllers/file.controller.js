const AzureService = require('../services/azure.service')

module.exports = class FileController {
  static async upload (request, response, next) {
    try {
      const { base64 } = request.body
      const data = await AzureService.uploadBase64('uploads', base64)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
      // response.status(400).json({ success: false })
    }
  }
}
