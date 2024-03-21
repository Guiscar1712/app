const { asClass } = require('awilix')

const RegisterAppRepository = require('../../../repositories/v1/registerAppRepository')
const RegisterAppService = require('../../../services/registerApp')
const RegisterAppSaveService = require('../../../services/registerApp/save')

module.exports = {
  RegisterAppRepository: asClass(RegisterAppRepository),
  RegisterAppService: asClass(RegisterAppService),
  RegisterAppSaveService: asClass(RegisterAppSaveService),
}
