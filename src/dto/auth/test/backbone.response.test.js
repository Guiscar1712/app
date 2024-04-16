const BackboneResponse = require('../backbone.response')

const mockResult = {
  document: '46614558005',
  birthday: new Date('1990-03-22T03:00:00.000Z'),
  name: 'Name of User',
  motherName: 'Mother Name of User',
}

test('Backbone Response new object', () => {
  const data = {
    cpf: '46614558005',
    dataNascimento: '1990/03/22',
    nome: 'Name of User',
    nomeMae: 'Mother Name of User',
  }

  const auth = new BackboneResponse(data)
  expect(auth).toEqual(mockResult)
})
