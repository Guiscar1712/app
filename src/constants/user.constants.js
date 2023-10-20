const REQUIRED_EMAIL = { CODE: 100, MESSAGE: 'Email é obrigatório' }
const REQUIRED_PASSWORD = { CODE: 101, MESSAGE: 'Senha é obrigatória' }
const INVALID_EMAIL = { CODE: 102, MESSAGE: 'E-mail inválido' }
const INVALID_PASSWORD = { CODE: 103, MESSAGE: 'Senha inválida' }
const REGISTERED_EMAIL = { CODE: 104, MESSAGE: 'E-mail já esta cadastrado' }
const REGISTERED_CPF = { CODE: 105, MESSAGE: 'CPF já esta cadastrado' }
const REGISTERED_CELLPHONE = {
  CODE: 106,
  MESSAGE: 'Celular já esta cadastrado',
}

module.exports = {
  REQUIRED_EMAIL,
  REQUIRED_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  REGISTERED_EMAIL,
  REGISTERED_CPF,
  REGISTERED_CELLPHONE,
}
