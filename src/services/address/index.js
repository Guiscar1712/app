module.exports = class AddressService {
  constructor({ AddressZipCodeService }) {
    this.AddressZipCodeService = AddressZipCodeService
  }

  addressByZipCode = async (zipCode) => {
    return await this.AddressZipCodeService.request(zipCode)
  }
}
