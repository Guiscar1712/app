const retry = require('../../utils/retry')
const { ClientServerError } = require('../../utils/errors')
const { contratoAceite } = require('./../../clients/ingresso/')
const { ContractDto } = require('../../dto/enrollment')

async function enrollmentDetails (contractId) {
  // const res = await retry(contratoAceite, contractId)
  // if (!res || !res.arquivo) {
  //   throw new ClientServerError('Não foi possivel obter o contrato para aceite', [{ contractId }])
  // }
  // const contract = new ContractDto(res)

  // mock
  const contract = new ContractDto(mock(contractId))

  return contract
}

function mock (contractId) {
  return {
    tipoId: 2,
    subTipoId: 10,
    status: 1,
    documentoId: '644390a2a7767761aa1877ed',
    templateId: null,
    nome: 'Termo Comercial EAD',
    dataCriacao: '2023-04-22T07:45:38',
    dataAlteracao: '2023-04-22T07:45:38',
    labels: {
      idSeq: '7181781',
      guidPortal: null,
      mantenedoraMarca: 'ANHANGUERA',
      mantenedoraNome: 'ANHANGUERA EDUCACIONAL PARTICIPAÇÕES S.A',
      mantenedoraMunicipio: 'VALINHOS',
      cnpj: '04310392000146',
      responsavelNome: '.',
      alunoNome: 'WEBKROTON',
      alunoRa: '35963409',
      cursoNome: 'ADMINISTRAÇÃO',
      unidade: '7484667',
      cpf: '810.322.540-17',
      semestre: '20231',
      matricula: '3596340901',
      sistema: 'Colaborar',
      tipoDocumento: 'TERMO_COMERCIAL_EAD',
      tipoContrato: null,
      nroparcela: null,
      tipoTermo: 'TermoCondicaoComercial',
      acao: 'Incluir',
      idExtratoPortal: ''
    },
    dadosAceite: {
      opcao: 1
    },
    opcoesAceite: [
      1
    ],
    dataInativacao: null,
    motivoInativacao: null,
    id: contractId
  }
}

module.exports = enrollmentDetails
