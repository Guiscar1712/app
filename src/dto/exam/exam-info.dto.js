
const moment = require('moment')

function toDto (item) {
  const prova = item.prova

  if (!prova) {
    return {}
  }

  let data = {
    status: prova.provastatus,
    maxAttempts: prova.quantidadeMaximaTentativas,
    numberAttempts: prova.quantidadeTentativas,
    startDate: prova.dataInicio,
    endDate: prova.dataFim,
    finishedOnline: prova.provaOnlineFinalizada,
    eligible: getEligible(prova)
  }

  data = getDuration(prova, data)

  return data
}

function getDuration (prova, data) {
  if (prova.dataInicio && prova.dataFim) {
    const startDate = moment(prova.dataInicio, 'YYYY-MM-DD HH:mm:ss')
    const endDate = moment(prova.dataFim, 'YYYY-MM-DD HH:mm:ss')
    const duration = Math.ceil(moment.duration(endDate.diff(startDate)).asMinutes())

    data.duration = duration

    return data
  }
  return data
}

function getEligible (prova) {
  if (prova.provaOnlineFinalizada) {
    return 'DONE'
  } else if (prova.quantidadeMaximaTentativas === prova.quantidadeTentativas) {
    return 'EXCEED_ATTEMPTS'
  } else if (prova.elegivelProvaOnline) {
    return 'ELIGIBLE'
  } else if (!prova.elegivelProvaOnline) {
    return 'NOT_ELIGIBLE'
  }
}

module.exports = (item) => {
  return toDto(item)
}
