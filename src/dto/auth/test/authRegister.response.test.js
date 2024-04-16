const AuthRegisterResponse = require('../authRegister.response')

const mockResult = {
  id: 1234,
  document: '46614558005',
  name: 'Name of User',
  email: 'nameofuser@mail.com',
  phone: '5518999999999',
  optin: true,
}

test('Auth Register Response new object', () => {
  const data = {
    id: 1234,
    name: 'Name of User',
    document: '46614558005',
    email: 'nameofuser@mail.com',
    phone: '5518999999999',
    optin: true,
  }

  const auth = new AuthRegisterResponse(data)
  expect(auth).toEqual(mockResult)
})
