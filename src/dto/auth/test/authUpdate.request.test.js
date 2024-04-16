const AuthUpdateRequest = require('../authUpdate.request')

test('Auth Update Response Execption', () => {
  expect(() => new AuthUpdateRequest()).toThrow()
})

test('Auth Update Response new object', () => {
  const mockResult = {
    email: 'nameofuser@mail.com',
    phone: '18999999999',
  }

  const data = {
    email: 'nameofuser@mail.com',
    phone: '18999999999',
  }

  const auth = new AuthUpdateRequest(data)
  expect(auth).toEqual(mockResult)
})

test('Auth Update Phone Response new object', () => {
  const data = {
    phone: '18999999999',
  }

  const auth = new AuthUpdateRequest(data)
  expect(auth).toEqual(data)
})

test('Auth Update Email Response new object', () => {
  const data = {
    email: 'nameofuser@mail.com',
  }

  const auth = new AuthUpdateRequest(data)
  expect(auth).toEqual(data)
})
