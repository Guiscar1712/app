const { asClass } = require('awilix')

const AddressController = require('../../../controllers/v1/address.controller')
const AddressService = require('../../../services/address')
const AddressZipCodeService = require('../../../services/address/addressByZipCode')

module.exports = {
  AddressController: asClass(AddressController),
  AddressService: asClass(AddressService),
  AddressZipCodeService: asClass(AddressZipCodeService),
}
