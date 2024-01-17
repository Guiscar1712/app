const doc = {
  info: {
    version: '1.0.9',
    title: 'Vitrine API',
    description:
      'Documentation automatically generated by the <b>swagger-autogen</b> module.',
  },
  host: 'bluecore-kroton-vitrine-api-homolog.azurewebsites.net',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  // servers: [
  //   {
  //     url: 'http://localhost:3000/api', // by default: 'http://localhost:3000'
  //     description: 'legado', // by default: ''
  //   },
  //   {
  //     url: 'http://localhost:3000/api/v1', // by default: 'http://localhost:3000'
  //     description: 'v1', // by default: ''
  //   },
  //   {
  //     url: 'http://localhost:3000/api/v2', // by default: 'http://localhost:3000'
  //     description: 'v2', // by default: ''
  //   },
  //   // { ... }
  // ],
  tags: [],
  definitions: {
    personalData: {
      cpf: '887.539.444-02',
      nome: 'TESTE TESTE',
      sexo: 'NI',
      rg: '1234567899',
      dataNascimento: '1990-06-28',
      documentosValidados: false,
      emails: [
        {
          email: 'teste@teste.com',
          principal: true,
        },
      ],
      telefones: [
        {
          tipo: 'MOVEL',
          numero: ' (11) 99000-0000',
          principal: true,
        },
        {
          tipo: 'MOVEL',
          numero: ' ',
        },
      ],
      enderecos: [
        {
          tipo: 'PRINCIPAL',
          logradouro: 'TESTE TESTE',
          numero: '123',
          bairro: '-',
          cep: '48970-000',
          municipio: 'SENHOR DO BONFIM',
          uf: 'BA',
        },
      ],
      necessidadesEspeciais: {
        email: false,
        sms: false,
        whatsApp: false,
      },
    },
    personalDataResponse: {
      cpf: '887.539.444-02',
      nome: 'TESTE TESTE',
      sexo: 'NI',
      rg: '1234567899',
      dataNascimento: '1990-06-28',
      emails: [
        {
          email: 'teste@teste.com',
          principal: true,
        },
      ],
      telefones: [
        {
          tipo: 'MOVEL',
          numero: '(11) 92345-6789',
          principal: true,
        },
        {
          tipo: 'FIXO',
          numero: '(11) 9234-5678',
          principal: false,
        },
      ],
      enderecos: [
        {
          tipo: 'PRINCIPAL',
          logradouro: 'TESTE TESTE',
          numero: '123',
          bairro: '-',
          cep: '48970-000',
          municipio: 'SENHOR DO BONFIM',
          uf: 'BA',
        },
      ],
      necessidadesEspeciais: [],
      canalComunicacao: {
        email: false,
        sms: false,
        whatsApp: false,
      },
      documentosValidados: false,
    },
    courses: [
      {
        name: 'Direito',
        identifier: 'direito',
        type: 'Bacharelado',
        score: 3,
        semesters: '10',
        krotonId: 'e14d4eaa6ee2940c30cebc644af73562',
        averageSalary: 4537.62,
        image: 'Direito_56012ba01c.jpg',
        priceFrom: 1518.75,
        priceTo: 499,
      },
    ],
    response400: {
      success: false,
      error: {
        type: 'ValidationError',
        code: '400',
        message: 'Parâmetros inválidos',
        errors: [
          {
            code: 9999,
            message: 'Parâmetro x inválido',
          },
        ],
      },
    },
    response401: {
      success: false,
      error: {
        type: 'ValidationError',
        code: 'AUTH-2200',
        message: 'Unauthorized',
        errors: [
          {
            code: 2288,
            message: 'O Usuário não foi autenticado',
          },
        ],
      },
    },
    response500: {
      success: false,
      error: {
        type: 'TypeError',
        code: -1,
        message: "Cannot read properties of undefined (reading 'length')",
        stack: 'TypeError: Cannot read properties...',
      },
    },
  },
  securityDefinitions: [
    {
      token: [
        {
          type: 'apiKey',
          name: 'token',
          in: 'header',
        },
      ],
    },
  ],
  components: {
    securitySchemes: {
      token: {
        type: 'apiKey',
        name: 'token',
        in: 'header',
      },
    },
  },
}

module.exports = doc
