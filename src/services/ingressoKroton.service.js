const axios = require('axios').create({ timeout: 1000000 })
const config = require('../utils/config')

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
      await axios.get(
        'https://bluecore-kroton-anhanguera-facelift-api-homolog.azurewebsites.net/cursos/origem/app',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key':
              'vG?Czh-uGfF[Ad37+gDP-KIEQ<XLZ_tFG-ADd_3T@]F4RP3gZ?AH0r0i5GFS'
          }
        }
      )
    ).data
  }
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
