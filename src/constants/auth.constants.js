const CODE = 'AUTH-2200'

const REQUIRED_USER_ID = { code: 2201, message: 'UserId é obrigatório' }
const REQUIRED_RECEIVER = { code: 2202, message: 'Receiver é obrigatório' }
const REQUIRED_PROVIDER = { code: 2203, message: 'Provider é obrigatório' }
const REQUIRED_TOKEN = { code: 2204, message: 'Token é obrigatória' }

const INVALID_TOKEN = {
  code: 2205,
  message: 'Token de Verificação é inválido.',
}

const REQUIRED_DOCUMENT = { code: 2206, message: 'CPF é obrigatório' }
const REQUIRED_NAME = { code: 2207, message: 'Nome é obrigatório' }
const REQUIRED_EMAIL = { code: 2208, message: 'Email é obrigatório' }
const REQUIRED_PHONE = { code: 2209, message: 'Telefone é obrigatório' }
const INVALID_DOCUMENT = { code: 2210, message: 'CPF inválido' }
const INVALID_NAME = { code: 2211, message: 'Nome inválido' }
const INVALID_EMAIL = { code: 2212, message: 'E-mail inválido' }
const INVALID_PHONE = { code: 2213, message: 'Telefone inválido' }

const EXIST_DOCUMENT = { code: 2214, message: 'CPF já cadastrado' }
const EXIST_EMAIL = { code: 2215, message: 'E-mail já cadastrado' }
const EXIST_PHONE = { code: 2216, message: 'Telefone já cadastrado' }

const REQUIRED_MOTHER_NAME = {
  code: 2217,
  message: 'Nome da mãe é obrigatório',
}

const REQUIRED_BIRTHDAY = {
  code: 2218,
  message: 'Data de nascimento é obrigatório',
}

const INVALID_MOTHER_NAME = { code: 2219, message: 'Nome da mãe inválido' }
const INVALID_BIRTHDAY = { code: 22020, message: 'Data de nascimento inválido' }

const UNAUTHORIZED = {
  code: 2288,
  message: `O Usuário não foi autenticado`,
}

const DIVERGENT_REGISTRATION = {
  code: 2289,
  message: `O e-mail informado na inscrição (%s) não confere com o CPF cadastrado.`,
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
  REQUIRED_DOCUMENT,
  REQUIRED_NAME,
  REQUIRED_EMAIL,
  REQUIRED_PHONE,
  INVALID_DOCUMENT,
  INVALID_NAME,
  INVALID_EMAIL,
  INVALID_PHONE,
  EXIST_DOCUMENT,
  EXIST_EMAIL,
  EXIST_PHONE,
  REQUIRED_MOTHER_NAME,
  REQUIRED_BIRTHDAY,
  INVALID_MOTHER_NAME,
  INVALID_BIRTHDAY,
  UNAUTHORIZED,
  DIVERGENT_REGISTRATION,
  NOT_IMPLEMENTED_PROVIDER,
}
