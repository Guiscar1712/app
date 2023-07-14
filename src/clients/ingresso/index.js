const getToken = require('./token')
const inscricoesPorCpf = require('./inscricoesPorCpf')
const inscricaoPorIdOrigin = require('./inscricaoPorIdOrigin')
const consultaProvaOnline = require('./consultaProvaOnline')
const consultaDadosPagamento = require('./consultaDadosPagamento')
const contratoAceite = require('./contratoAceite')
const contratosPorMatricula = require('./contratosPorMatricula')
const contratoPorId = require('./contratoPorContratoId')
const contratosPorBusinessKey = require('./contratosPorBusinessKey')

module.exports = {
  getToken,
  inscricoesPorCpf,
  inscricaoPorIdOrigin,
  consultaProvaOnline,
  consultaDadosPagamento,
  contratoAceite,
  contratoPorId,
  contratosPorMatricula,
  contratosPorBusinessKey
}
