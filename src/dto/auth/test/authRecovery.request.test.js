const AuthRecoveryRequest = require('../authRecovery.request')
const { ValidationError } = require('../../../utils/errors')

const mockResult = {
  userId: 199,
  name: 'Name of User',
  document: '46614558005',
  motherName: 'Mother Name of User',
  birthday: new Date('1990-03-22T03:00:00.000Z'),
}

test('Auth Recovery Execption', () => {
  const errorMockExpect = new ValidationError(
    'Parâmetros inválidos',
    [
      {
        code: 2201,
        message: 'UserId é obrigatório',
      },
      {
        code: 2210,
        message: 'CPF inválido',
      },
      {
        code: 2218,
        message: 'Data de nascimento é obrigatório',
      },
      {
        code: 2207,
        message: 'Nome é obrigatório',
      },
      {
        code: 2217,
        message: 'Nome da mãe é obrigatório',
      },
    ],
    'AUTH-2200'
  )

  const authRecovery = () => new AuthRecoveryRequest()
  expect(authRecovery).toThrow(errorMockExpect)
})

test('Auth Recovery new object', () => {
  const data = {
    userId: 199,
    name: 'Name of User',
    document: '46614558005',
    motherName: 'Mother Name of User',
    birthday: '1990/03/22',
  }

  const auth = new AuthRecoveryRequest(data)
  expect(auth).toEqual(mockResult)
})
