const getToken = require('./token')
const inscricoesPorCpf = require('./inscricoesPorCpf')
const inscricaoPorIdOrigin = require('./inscricaoPorIdOrigin')
const consultaProvaOnline = require('./consultaProvaOnline')
const consultaDadosPagamento = require('./consultaDadosPagamento')
module.exports = {
  getToken,
  inscricoesPorCpf,
  inscricaoPorIdOrigin,
  consultaProvaOnline,
  consultaDadosPagamento
}
