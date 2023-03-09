
function toDto (item) {
  const { matricula, inscricao, dadosPessoais } = item

  const course = inscricao?.ofertas?.primeiraOpcao

  const getRegistration = !!(matricula.id && matricula.ra)
  const getDescriptionRegistration = getRegistration ? 'Matriculado' : (inscricao.tipoIngresso === 'VESTIBULAR' ? 'Vestibular online' : 'Inscrição')
  const getRegistrationPayment = inscricao.pagamento?.isento ?? inscricao.pagamento?.pago

  return {
    courseTypeName: course.dsTipoCurso,
    courseName: course.dsCurso,
    studentCode: dadosPessoais.ra,
    studentName: dadosPessoais.nome,
    studentEmail: dadosPessoais.email,
    unit: course.dsUnidade,
    modality: course.dsModalidade,
    shift: course.dsTurno,
    registration: getRegistration,
    registrationPayment: getRegistrationPayment,
    monthlyPayment: course.vlMensalidadePara,
    descriptionRegistration: getDescriptionRegistration
  }
}

module.exports = (item) => {
  if (Array.isArray(item)) {
    const courses = []

    item.forEach(element => {
      courses.push(toDto(element))
    })

    return courses
  }
  return toDto(item)
}
