module.exports = (data) => {
  if (!isValid(data)) {
    return 'ERROR'
  }

  const classificacao = data.inscricao.classificacao

  const enrollment = ['ALUNO']
  const registered = ['INSCRITO', 'INSCRITO VG ONLINE', 'CONVOCADO']
  const disqualified = ['DESCLASSIFICADO', 'DESCLASSIFICADO POR NOTA']

  const classification = classificacao.descricao?.toUpperCase()

  if (enrollment.includes(classification)) {
    return 'STUDENT'
  }

  if (registered.includes(classification)) {
    return 'ENROLLMENT'
  }

  if (disqualified.includes(classification)) {
    return 'DISQUALIFIED'
  }

  return 'ABSENT'
}

function isValid(data) {
  const { inscricao, processamento } = data

  if (processamento?.status !== 'SUCCESS') {
    return false
  }

  if (
    inscricao?.ofertas?.primeiraOpcao?.dsTipoCurso == 'Curso_tecnico' ||
    inscricao?.ofertas?.primeiraOpcao?.dsNivelAcademico == 'CURSO_TECNICO'
  ) {
    return false
  }

  const { ofertas } = inscricao

  const course = ofertas.primeiraOpcao
  if (!course) {
    return false
  }

  return true
}
