const Util = require('../../utils/util')

function toDto (item) {
  try {
    const student = {
      StudentReference: item.matricula.ra,
      RA: item.matricula.ra,
      CPF: Util.getNumbers(item.dadosPessoais.cpf).toString(),
      Name: item.dadosPessoais.nome,
      Email: item.dadosPessoais.email,
      Address: {
        Street: item.dadosPessoais.endereco.logradouro,
        Number: item.dadosPessoais.endereco.numero,
        City: item.dadosPessoais.endereco.municipio,
        State: item.dadosPessoais.endereco.uf,
        Zip: Util.getNumbers(item.dadosPessoais.endereco.cep).toString(),
        ZipFormated: item.dadosPessoais.endereco.cep,
        Country: 'BR',
        Neighborhood: item.dadosPessoais.endereco.bairro
      }
    }

    // [Logradouro, Numero, Bairro]
    const schoolAddress = item.inscricao.ofertas.primeiraOpcao.dsUnidadeEndereco.split('-')[0].split(',')

    const school = {
      Name: item.inscricao.ofertas.primeiraOpcao.dsMarca,
      Cnpj: Util.getNumbers(item.inscricao.ofertas.primeiraOpcao.cnpjUnidade).toString(),
      Address: {
        Street: schoolAddress[0].trim(),
        Number: Util.getNumbers(item.inscricao.ofertas.primeiraOpcao.dsUnidadeEndereco).toString(),
        Complement: item.inscricao.ofertas.primeiraOpcao.dsUnidadeEndereco,
        City: item.inscricao.ofertas.primeiraOpcao.dsUnidadeEstado,
        State: item.inscricao.ofertas.primeiraOpcao.dsUnidadeEstado,
        Zip: Util.getNumbers(item.inscricao.ofertas.primeiraOpcao.cepUnidade).toString(),
        ZipFormated: item.inscricao.ofertas.primeiraOpcao.cepUnidade,
        Country: 'BR',
        Neighborhood: schoolAddress[2].trim()
      }
    }

    const charges = {
      ChargeReference: item.inscricao.ofertas.primeiraOpcao.idCursoOrigem,
      Description: item.inscricao.ofertas.primeiraOpcao.dsCurso + ' ' + item.inscricao.ofertas.primeiraOpcao.dsConcurso,
      Course: {
        CourseReference: item.inscricao.ofertas.primeiraOpcao.idCurso,
        Name: item.inscricao.ofertas.primeiraOpcao.dsCurso
      },
      Items: [
        {
          ItemReference: item.inscricao.ofertas.primeiraOpcao.idCursoOrigem,
          Product: item.inscricao.ofertas.primeiraOpcao.dsCurso,
          Description: item.inscricao.ofertas.primeiraOpcao.dsConcurso,
          UnitPrice: item.inscricao.ofertas.primeiraOpcao.vlMatricula,
          TotalPrice: item.inscricao.ofertas.primeiraOpcao.vlMatricula
        }
      ],
      TotalAmount: item.inscricao.ofertas.primeiraOpcao.vlMatricula
    }

    const data = {
      origin: item.sistema.toUpperCase(),
      OriginalDueDate: item.inscricao.ofertas.primeiraOpcao.dtTerminoInscricao,
      DueDate: item.inscricao.ofertas.primeiraOpcao.dtTerminoInscricao,
      RedirectUrl: item.inscricao.contrato.link,
      OrderReference: 'RA-2023' + item.matricula.ra,
      InvoiceType: 'Matricula'
    }

    return {
      ...data,
      PreDefinedOptions: {
        Pix: {
          DirectPix: true
        }
      },
      Charges: [charges],
      TotalAmount: charges.TotalAmount,
      Student: student,
      School: school
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = (item) => {
  return toDto(item)
}
