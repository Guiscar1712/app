const getToken = require('./token')
const inscricoesPorCpf = require('./inscricoesPorCpf')
const inscricaoPorIdOrigin = require('./inscricaoPorIdOrigin')
const consultaProvaOnline = require('./consultaProvaOnline')
const consultaDadosPagamento = require('./consultaDadosPagamento')
const contratoAceite = require('./contractoAceite')
const contratoPorMatricula = require('./contractosPorMatricula')
const contratoPorId = require('./contractoPorContratoId')

module.exports = {
  getToken,
  inscricoesPorCpf,
  inscricaoPorIdOrigin,
  consultaProvaOnline,
  consultaDadosPagamento,
  contratoAceite,
  contratoPorId,
  contratoPorMatricula
}
