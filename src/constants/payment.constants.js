const code = 'PAYMENT-3300'
const REQUIRED_ORIGINID = { code: 3301, message: 'originId é obrigatório' }
const REQUIRED_BUSINESSKEY = {
  code: 3302,
  message: 'Inscricao não possui businesskey',
}
const PAYMENT_PAID = {
  code: 3303,
  message: 'Inscricao já possui pagamento efetuado',
}

module.exports = {
  code,
  REQUIRED_ORIGINID,
  REQUIRED_BUSINESSKEY,
  PAYMENT_PAID,
}
