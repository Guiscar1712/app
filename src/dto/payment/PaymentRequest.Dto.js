const { isEmpty } = require('../../utils/util')
const {
  PaymentRequestValidator,
  ChargesValidator,
  ChargesItemValidator,
  DiscountValidator,
  StudentValidator,
  SchoolValidator,
  AddressValidator,
} = require('./PaymentRequest.Validator')

let errors = {}
let errorsAddress = []
let errorsChargesItems = []

class PaymentRequest {
  orderReference
  invoiceType
  totalAmount
  krotonBrand
  recurrenceReference
  issueDate
  referenceDate
  lateInterestValueAbsolute
  originalDueDate
  fineValue
  fineValuePercentage
  lateInterestValue
  lateInterestValuePercentage
  dueDate
  dueDateInformative
  remarks
  redirectUrl
  adjustLayoutToIFrame

  constructor(data) {
    errors = {}
    errorsAddress = []
    errorsChargesItems = []

    this.orderReference = data.orderReference
    this.invoiceType = data.invoiceType
    this.totalAmount = data.totalAmount
    this.krotonBrand = data.krotonBrand
    this.recurrenceReference = data.recurrenceReference
    this.issueDate = data.issueDate
    this.referenceDate = data.referenceDate
    this.lateInterestValueAbsolute = data.lateInterestValueAbsolute
    this.originalDueDate = data.originalDueDate
    this.fineValue = data.fineValue
    this.fineValuePercentage = data.fineValuePercentage
    this.lateInterestValue = data.lateInterestValue
    this.lateInterestValuePercentage = data.lateInterestValuePercentage
    this.dueDate = data.dueDate
    this.dueDateInformative = data.dueDateInformative
    this.remarks = data.remarks
    this.redirectUrl = data.redirectUrl || 'https://www.anhanguera.com/'
    this.adjustLayoutToIFrame = false    
    this.charges = this._setCharges(data.charges)
    this.discount = this._setDiscount(data.discount)
    this.student = this._setStudent(data.student)
    this.school = this._setSchool(data.school)

    const contract = PaymentRequestValidator(this)

    if (!contract.isValid()) {
      errors = { ...errors, ...contract.errors() }
    }
  }

  _setDiscount(data) {
    if (!data) {
      return null
    }

    const discount = {
      amount: data.amount,
      limitDate: data.limitDate,
    }

    const contract = DiscountValidator(discount)

    if (!contract.isValid()) {
      errors.discount = { ...contract.errors() }
    }

    return discount
  }

  _setCharges(data) {
    if (!data || data.length <= 0) {
      return null
    }

    const charges = []

    data.forEach((element) => {
      if (element) {
        const charge = {
          chargeReference: element.chargeReference,
          description: element.description,
          course: this._setChargesCourse(element.course),
          items: this._setChargesItems(element.items),
        }

        charges.push(charge)

        const contract = ChargesValidator(charge)

        let chargesErrors = {}
        if (!contract.isValid()) {
          chargesErrors = { ...contract.errors() }
        }

        if (errorsChargesItems.length > 0) {
          chargesErrors.items = { ...errorsChargesItems }
        }

        if (!isEmpty(chargesErrors)) {
          errors.charges = chargesErrors
        }
      }
    })

    return charges
  }

  _setChargesCourse(data) {
    const course = {
      courseReference: data.courseReference,
      name: data.name,
    }

    return course
  }

  _setChargesItems(data) {
    errorsChargesItems = []
    if (!data) {
      return null
    }

    const items = []

    data.forEach((element) => {
      const item = {
        itemReference: element.itemReference,
        lineNumber: element.lineNumber,
        product: element.product,
        description: element.description,
        unitPrice: element.unitPrice,
        quantity: element.quantity,
        totalPrice: element.totalPrice,
        remarks: element.remarks,
        groupDefinition: this._setChargesItemsGroupDefinition(
          element.groupDefinition
        ),
        issueDate: element.issueDate,
      }

      items.push(item)

      const contract = ChargesItemValidator(item)

      if (!contract.isValid()) {
        errorsChargesItems.push(contract.errors())
      }
    })

    return items
  }

  _setChargesItemsGroupDefinition(data) {
    const groupDefinition = {
      key: data.key,
      order: data.order,
      description: data.description,
      sign: data.sign,
    }

    return groupDefinition
  }

  _setStudent(data) {
    if (!data) {
      return null
    }

    const student = {
      studentReference: data.studentReference,
      cpf: data.cpf,
      ra: data.ra,
      subscription: data.subscription,
      name: data.name,
      email: data.email,
      address: this._setAddress(data.address),
    }

    if (student.ra && student.subscription) {
      delete student.subscription
    }

    const contract = StudentValidator(student)
    let studentErrors = {}
    if (!contract.isValid()) {
      studentErrors = { ...contract.errors() }
    }

    if (errorsAddress.length > 0) {
      studentErrors.address = errorsAddress
    }

    student.alternativeAddress = this._setAddress(data.alternativeAddress)
    if (errorsAddress.length > 0) {
      studentErrors.alternativeAddress = errorsAddress
    }

    if (!isEmpty(studentErrors)) {
      errors.student = studentErrors
    }

    return student
  }

  _setSchool(data) {
    const school = {
      name: data.name,
      cnpj: data.cnpj,
      address: this._setAddress(data.address),
    }

    const contract = SchoolValidator(school)
    let schoolErrors = {}
    if (!contract.isValid()) {
      schoolErrors = { ...contract.errors() }
    }

    if (errorsAddress.length > 0) {
      schoolErrors.address = errorsAddress
    }

    if (!isEmpty(schoolErrors)) {
      errors.school = schoolErrors
    }

    return school
  }

  _setAddress(data) {
    errorsAddress = []
    if (!data) {
      return null
    }

    const zipCode = data.zip || '00000-000'

    const address = {
      street: data.street,
      number: data.number,
      complement: data.complement,
      city: data.city,
      state: data.state,
      zip: zipCode,
      zipFormated: zipCode,
      country: data.country,
      neighborhood: data.neighborhood,
    }

    const contract = AddressValidator(address)

    if (!contract.isValid()) {
      errorsAddress = contract.errors()
    }

    return address
  }

  setPreDefinedOptions() {
    throw new Error('Method must be implemented')
  }

  isValid() {
    return isEmpty(errors)
  }

  errors() {
    return errors
  }
}

module.exports = PaymentRequest
