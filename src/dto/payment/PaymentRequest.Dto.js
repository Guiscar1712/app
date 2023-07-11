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

  constructor (data) {
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
    this._setLinkCheckout(data.linkCheckout)
    this._setCharges(data.charges)
    this._setStudent(data.student)
    this._setSchool(data.school)
  }

  _setLinkCheckout (data) {
    this.linkCheckout = data
  }

  _setCharges (data) {
    this.charges = data
  }

  _setStudent (data) {
    this.student = data

    if (this.student.ra && this.student.subscription) {
      delete this.student.subscription
    }
  }

  _setSchool (data) {
    this.school = data
  }

  setPreDefinedOptions () {
    throw new Error('Method must be implemented')
  }
}

module.exports = PaymentRequest
