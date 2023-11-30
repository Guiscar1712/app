const CODE = 'AUTH-2200'

const REQUIRED_USER_ID = { code: 2201, message: 'UserId é obrigatório' }
const REQUIRED_RECEIVER = { code: 2202, message: 'Receiver é obrigatório' }
const REQUIRED_PROVIDER = { code: 2203, message: 'Provider é obrigatório' }
const REQUIRED_TOKEN = { code: 2204, message: 'Token é obrigatória' }
const INVALID_TOKEN = {
  code: 2205,
  message: 'Token de Verificação é inválido.',
}

const DIVERGENT_REGISTRATION = {
  code: 2289,
  message: 'Email não confere com CPF cadastrado.',
}

const NOT_IMPLEMENTED_PROVIDER = {
  code: 2299,
  message: 'Provider está disponível.',
}

module.exports = {
  CODE,
  REQUIRED_USER_ID,
  REQUIRED_RECEIVER,
  REQUIRED_PROVIDER,
  REQUIRED_TOKEN,
  INVALID_TOKEN,
  DIVERGENT_REGISTRATION,
  NOT_IMPLEMENTED_PROVIDER,
}
