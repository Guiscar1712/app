const retry = require('../../utils/retry')
const { ClientServerError } = require('../../utils/errors')
const { ContractDto } = require('../../dto/enrollment')

module.exports = class ContractAcceptedService {
  constructor ({ IngressoClient, LoggerService }) {
    this.LoggerService = LoggerService
    this.IngressoClient = IngressoClient
  }

  contractAccepted = async (contractId, clientIp) => {
    const body = { opcao: 1, ip: clientIp }
    const step = this.LoggerService.addStepStepTrace(
      'ContractAcceptedServiceContractAccepted'
    )

    try {
      const res = await retry(this.IngressoClient.contratoAceite, { contractId, body })
      if (!res || !res.dadosAceite) {
        const error = new ClientServerError('Something went wrong', [{ contractId, body }])
        throw error
      }
      const contract = new ContractDto(res)

      if (contract.status === 'ERROR') {
        const error = new ClientServerError('Something went wrong', [{ contractId, body }])
        throw error
      }

      this.LoggerService.finalizeStep(step.value, step.key, { contract })
      return contract
    } catch (error) {
      throw error
    }
  }

  // function mock (contractId) {
  //   return {
  //     tipoId: 2,
  //     subTipoId: 10,
  //     status: 1,
  //     documentoId: '644390a2a7767761aa1877ed',
  //     templateId: null,
  //     nome: 'Termo Comercial EAD',
  //     dataCriacao: '2023-04-22T07:45:38',
  //     dataAlteracao: '2023-04-22T07:45:38',
  //     labels: {
  //       idSeq: '7181781',
  //       guidPortal: null,
  //       mantenedoraMarca: 'ANHANGUERA',
  //       mantenedoraNome: 'ANHANGUERA EDUCACIONAL PARTICIPAÇÕES S.A',
  //       mantenedoraMunicipio: 'VALINHOS',
  //       cnpj: '04310392000146',
  //       responsavelNome: '.',
  //       alunoNome: 'WEBKROTON',
  //       alunoRa: '35963409',
  //       cursoNome: 'ADMINISTRAÇÃO',
  //       unidade: '7484667',
  //       cpf: '810.322.540-17',
  //       semestre: '20231',
  //       matricula: '3596340901',
  //       sistema: 'Colaborar',
  //       tipoDocumento: 'TERMO_COMERCIAL_EAD',
  //       tipoContrato: null,
  //       nroparcela: null,
  //       tipoTermo: 'TermoCondicaoComercial',
  //       acao: 'Incluir',
  //       idExtratoPortal: ''
  //     },
  //     dadosAceite: {
  //       opcao: 1
  //     },
  //     opcoesAceite: [
  //       1
  //     ],
  //     dataInativacao: null,
  //     motivoInativacao: null,
  //     id: contractId
  //   }
}
