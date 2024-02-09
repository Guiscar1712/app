const Validator = require('../../validators/validator')

module.exports = {
  PaymentRequestValidator (value) {
    const contract = new Validator()

    contract.isRequired(value.originalDueDate, '40103', 'originalDueDate is required')
    contract.isRequired(value.orderReference, '40103', 'orderReference is required')
    contract.hasMinLen(value.orderReference, 3, '40103', 'orderReference minimum size 3')
    contract.hasMaxLen(value.orderReference, 150, '40103', 'orderReference maximum size 150')

    contract.isRequired(value.invoiceType, '40103', 'invoiceType is required')
    contract.hasMinLen(value.invoiceType, 3, '40103', 'invoiceType minimum size 3')
    contract.hasMaxLen(value.invoiceType, 150, '40103', 'invoiceType maximum size 150')

    // [ Anhanguera, Fama, Lfg, Pitagoras, PitagorasICF, Plurall, Somos, Unic, Uniderp, Unime, Unopar, CognaPay, Voomp ]
    contract.isRequired(value.krotonBrand, '40103', 'krotonBrand is required')

    contract.isRequired(value.charges, '40103', 'charges is required')
    contract.isRequired(value.student, '40103', 'student is required')
    contract.isRequired(value.school, '40103', 'school is required')

    return contract
  },

  ChargesValidator (value) {
    const contract = new Validator()
    contract.isRequired(value.chargeReference, '40103', 'chargeReference is required')

    contract.isRequired(value.description, '40103', 'description is required')
    contract.hasMinLen(value.description, 3, '40103', 'description minimum size 3')
    contract.hasMaxLen(value.description, 150, '40103', 'description maximum size 150')

    contract.isRequired(value.course, '40103', 'originId is required')
    contract.isRequired(value.items, '40103', 'originId is required')
    return contract
  },

  ChargesItemValidator (value) {
    const contract = new Validator()
    contract.isRequired(value.itemReference, '40103', 'itemReference is required')

    contract.isRequired(value.lineNumber, '40103', 'lineNumber is required')
    contract.hasNumMin(value.lineNumber, 0, '40103', 'lineNumber minimum 0')
    contract.hasNumMax(value.lineNumber, 999, '40103', 'lineNumber maximum 999')

    contract.isRequired(value.product, '40103', 'product is required')
    contract.hasMinLen(value.product, 3, '40103', 'product minimum size 3')
    contract.hasMaxLen(value.product, 150, '40103', 'product maximum size 150')

    contract.isRequired(value.description, '40103', 'description is required')
    contract.hasMinLen(value.description, 3, '40103', 'description minimum size 3')
    contract.hasMaxLen(value.description, 150, '40103', 'description maximum size 150')

    contract.isRequired(value.totalPrice, '40103', 'totalPrice is required')
    contract.hasNumMin(value.totalPrice, -99999.99, '40103', 'totalPrice minimum -99999.99')
    contract.hasNumMax(value.totalPrice, 99999.99, '40103', 'totalPrice maximum 99999.99')

    return contract
  },

  DiscountValidator (value) {
    const contract = new Validator()
    contract.hasNumMin(value.amount, 0, '40103', 'amount is required')
    contract.isRequired(value.limitDate, '40103', 'limitDate is required')
    return contract
  },

  StudentValidator (value) {
    const contract = new Validator()
    contract.isRequired(value.studentReference, '40103', 'studentReference is required')
    contract.isRequired(value.name, '40103', 'name is required')
    contract.isRequired(value.email, '40103', 'email is required')
    contract.isRequired(value.address, '40103', 'address is required')
    contract.isFixedLen(value.cpf, 11, '40103', 'cpf must contain 11 characters')

    return contract
  },

  SchoolValidator (value) {
    const contract = new Validator()
    contract.isRequired(value.name, '40103', 'name is required')
    contract.isRequired(value.cnpj, '40103', 'cnpj is required')
    contract.isRequired(value.address, '40103', 'address is required')
    return contract
  },

  AddressValidator (value) {
    const contract = new Validator()
    contract.isRequired(value.street, '40103', 'street is required')
    contract.isRequired(value.number, '40103', 'number is required')
    contract.isRequired(value.city, '40103', 'city is required')
    contract.isRequired(value.state, '40103', 'state is required')
    
    //===========================================================================
    //A validação de CEP está sendo removida para testes (ID Monday: 6026658532) 
    //contract.isRequired(value.zip, '40103', 'zip is required')
    //contract.isRequired(value.zipFormated, '40103', 'zipFormated is required')
    //===========================================================================

    contract.isRequired(value.country, '40103', 'country is required')
    contract.isRequired(value.neighborhood, '40103', 'neighborhood is required')
    return contract
  }
}
