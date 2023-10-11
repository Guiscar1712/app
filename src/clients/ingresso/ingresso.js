module.exports = class Ingresso {
  constructor({
    LoggerService,
    IngressoGetDadosPagamento,
    InscricaoPorIdOrigin,
    PersonalData,
    PersonalDataUpdate,
    ContratoAceite,
    ContratoPorContratoId,
    ProvaIniciar,
  }) {
    this.LoggerService = LoggerService
    this.IngressoGetDadosPagamento = IngressoGetDadosPagamento
    this.InscricaoPorIdOrigin = InscricaoPorIdOrigin
    this.ContratoAceite = ContratoAceite
    this.PersonalData = PersonalData
    this.PersonalDataUpdate = PersonalDataUpdate
    this.ContratoPorContratoId = ContratoPorContratoId
    this.ProvaIniciar = ProvaIniciar
  }

  personalDataGet = async (cpf) => {
    return await this.PersonalData.request(cpf)
  }

  personalDataUpdate = async (body) => {
    return await this.PersonalDataUpdate.request(body)
  }

  getDadosPagamento = async (businessKey) => {
    return await this.IngressoGetDadosPagamento.request(businessKey)
  }

  inscricaoPorIdOrigin = async (idOrigin) => {
    return await this.InscricaoPorIdOrigin.request(idOrigin)
  }

  contratoAceite = async ({ contractId, body }) => {
    return await this.ContratoAceite.request({ contractId, body })
  }

  contratoPorContratoId = async ({ contractId, body }) => {
    return await this.ContratoPorContratoId.request({ contractId, body })
  }

  provaInicar = async (subscriptionKeyEncode) => {
    return await this.ProvaIniciar.request(subscriptionKeyEncode)
  }
}
