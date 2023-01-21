const axios = require('axios').create({ timeout: 1000000 })
const config = require('../utils/config')
const cheerio = require('cheerio')

module.exports = class IngressoKrotonService {
  static async getToken () {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: config.kroton.ingresso.client_id,
      client_secret: config.kroton.ingresso.client_secret
    })

    return (
      await axios.post(config.kroton.ingresso.url + '/oauth2/token', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    ).data
  }

  static async getSubscription (cpf, token) {
    return (
      await axios.get(
        'https://ingresso-api.kroton.com.br/ms/inscricaocqrs/captacao/v5/inscricao/cpf/' +
          cpf,
        {
          headers: {
            'Ocp-Apim-Subscription-Key':
              config.kroton.ingresso.OcpApimSubscriptionKey,
            Authorization: token
          }
        }
      )
    ).data
  }

  static async createSubscription (body, token) {
    return (
      await axios.post(
        'https://ingresso-api.kroton.com.br/ms/inscricaocqrs/captacao/v5/inscricao',
        body,
        {
          headers: {
            'Ocp-Apim-Subscription-Key':
              config.kroton.ingresso.OcpApimSubscriptionKey,
            Authorization: token
          }
        }
      )
    ).data
  }

  static async getCourses () {
    return (
      await axios.get(`${process.env.KROTON_API_BASE_URL}/cursos/origem/app`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY
        }
      })
    ).data
  }

  static async getCourse ({ identifier }) {
    const item = (
      await axios.get(
        `${process.env.KROTON_API_BASE_URL}/cursos/${identifier}/complete`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': process.env.KROTON_API_X_ACCESS_KEY
          }
        }
      )
    ).data

    return {
      Identifier: item.Identifier,
      Type: item.Type,
      Name: item.Name,
      Score: item.Score || 0,
      Semesters: item.Semesters,
      Description: htmlExtractItem(item.Description, 'p'),
      KrotonId: item.KrotonId,
      Image: item.Image,
      // Modalities: item.Modalities,
      // Origins: item.Origins,
      AboutCourseCall: htmlExtractItem(item.AboutCourseCall, 'p'),
      AboutCourseDescription: htmlExtractItem(item.AboutCourseDescription, 'p'),
      CourseTargetCall: htmlExtractItem(item.CourseTargetCall, 'p'),
      CourseTargetDescription: htmltoList(item.CourseTargetDescription),
      CourseSubjectsCall: htmlExtractItem(item.CourseSubjectsCall, 'p'),
      CourseSubjectsDescription: htmltoList(item.CourseSubjectsDescription),
      MarketCall: item.MarketCall || '',
      MarketDescription: htmlExtractItem(item.MarketDescription, 'p'),
      RelatedCourses: item.RelatedCourses || [],
      AverageSalaries: item.AverageSalaries || []
    }
  }
}

function htmltoList (html) {
  const items = []
  if (!html) return []
  const $ = cheerio.load(html)
  $('li')
    .get()
    .map(e => items.push($(e).text().trim()))
    .join(' ')
  return items
}

function htmlExtractItem (html, tag) {
  if (!html) return ''
  const $ = cheerio.load(html)
  return $(tag).text() || html
}

/* const sample_body = {
  inscricao: {
    enem: {
      utilizar: true,
      protocolo: 'string'
    },
    anoConclusao: 0,
    consultor: 0,
    consultorInscricao: {
      id: 0,
      nome: 'string',
      cpf: 'string'
    },
    aceiteTermo: true,
    aceitaReceberEmail: true,
    aceitaReceberSMS: true,
    aceitaReceberWhatsApp: true,
    idAfiliado: 'string',
    ofertas: {
      primeiraOpcao: {
        id: 'string'
      },
      segundaOpcao: {
        id: 'string'
      }
    },
    canalVendas: {
      id: 0
    },
    idTipoProva: 0,
    cupom: 'string'
  },
  dadosPessoais: {
    nome: 'string',
    cpf: 'string',
    sexo: 'string',
    rg: 'string',
    dataNascimento: 'string',
    email: 'string',
    emailAdicional: 'string',
    celular: 'string',
    telefoneResidencial: 'string',
    celularAdicional: 'string',
    endereco: {
      logradouro: 'string',
      numero: 'string',
      complemento: 'string',
      bairro: 'string',
      telefone: 'string',
      codigoIbge: 'string',
      cep: 'string',
      uf: 'string',
      municipio: 'string'
    },
    necessidadesEspeciais: [
      {
        id: 0
      }
    ]
  }
} */
