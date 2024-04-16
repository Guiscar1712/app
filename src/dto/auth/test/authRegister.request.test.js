const AuthRegisterRequest = require('../authRegister.request')
const { ValidationError } = require('../../../utils/errors')

const mockResult = {
  document: '46614558005',
  name: 'Name of User',
  email: 'nameofuser@mail.com',
  phone: '5518999999999',
  optin: true,
}

test('Auth Register Execption', () => {
  const errorMockExpect = new ValidationError(
    'Parâmetros inválidos',
    [
      {
        code: 2206,
        message: 'CPF é obrigatório',
      },
      {
        code: 2207,
        message: 'Nome é obrigatório',
      },
      {
        code: 2212,
        message: 'E-mail inválido',
      },
      {
        code: 2209,
        message: 'Telefone é obrigatório',
      },
    ],
    'AUTH-2200'
  )

  expect(() => new AuthRegisterRequest()).toThrow(errorMockExpect)
})

test('Auth Register new object', () => {
  const data = {
    name: 'Name of User',
    document: '466.145.580-05',
    email: 'nameofuser@mail.com',
    phone: '5518999999999',
    optin: true,
  }

  const auth = new AuthRegisterRequest(data)
  expect(auth).toEqual(mockResult)
})
