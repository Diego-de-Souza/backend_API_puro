const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de usuários',
        version: '1.0.0',
        description: 'APi desenvolvida com NodeJS e express seguindo a arquitetura hexagonal',
        contact: {
          name: 'Diego de Souza L.',
          url: 'https://github.com/Diego-de-Souza/backend_API_puro',
          email: 'diegodesouza.souza@gmail.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000', 
        },
      ],
    },
    apis: [
      path.join(__dirname, '../../infra/adapters/controller/*.js'), 
      path.join(__dirname, '../../application/**/*.js'),
      path.join(__dirname, '../../docs/schemas/*.yaml')
    ]
};

const specs = swaggerJsdoc(options);

module.exports = { specs };