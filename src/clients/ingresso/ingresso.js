module.exports = class Ingresso {
  constructor({
    LoggerService,
    IngressoGetDadosPagamento,
    InscricoesPorCpf,
    InscricaoPorIdOrigin,
    PersonalData,
    PersonalDataUpdate,
    ContratoAceite,
    ContratoPorContratoId,
    ProvaIniciar,
    ProvaFinalizar,
    ProvaElegibilidade,
    ProvaConsulta,
  }) {
    this.LoggerService = LoggerService
    this.IngressoGetDadosPagamento = IngressoGetDadosPagamento
    this.InscricoesPorCpf = InscricoesPorCpf
    this.InscricaoPorIdOrigin = InscricaoPorIdOrigin
    this.ContratoAceite = ContratoAceite
    this.PersonalData = PersonalData
    this.PersonalDataUpdate = PersonalDataUpdate
    this.ContratoPorContratoId = ContratoPorContratoId
    this.ProvaIniciar = ProvaIniciar
    this.ProvaFinalizar = ProvaFinalizar
    this.ProvaElegibilidade = ProvaElegibilidade
    this.ProvaConsulta = ProvaConsulta
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

  inscricoesPorCpf = async (Cpf) => {
    return await this.InscricoesPorCpf.request(Cpf)
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

  provaFinalizar = async (subscriptionKeyEncode, model) => {
    return await this.ProvaFinalizar.request(subscriptionKeyEncode, model)
  }

  provaElegibilidade = async (subscriptionKey) => {
    return await this.ProvaElegibilidade.request(subscriptionKey)
  }

  provaConsulta = async (subscriptionKey) => {
    return await this.ProvaConsulta.request(subscriptionKey)
  }
}
