const getToken = require('./token')
const inscricoesPorCpf = require('./inscricoesPorCpf')
const inscricaoPorIdOrigin = require('./inscricaoPorIdOrigin')
const consultaProvaOnline = require('./consultaProvaOnline')
const consultaProvaOnlinePorBusinesskey = require('./consultaProvaOnlinePorBusinesskey')
const contratoAceite = require('./contratoAceite')
const contratoPorId = require('./contratoPorContratoId')
const contratosPorMatricula = require('./contratosPorMatricula')
const contratosPorBusinessKey = require('./contratosPorBusinessKey')
const getBackbone = require('./backbone')

module.exports = {
  getToken,
  inscricoesPorCpf,
  inscricaoPorIdOrigin,
  consultaProvaOnline,
  consultaProvaOnlinePorBusinesskey,
  contratoAceite,
  contratoPorId,
  contratosPorMatricula,
  contratosPorBusinessKey,
  getBackbone,
}
