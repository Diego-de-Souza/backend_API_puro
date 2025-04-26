const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Nome da Sua API',
        version: '1.0.0',
        description: 'Descrição da sua API',
      },
      servers: [
        {
          url: 'http://localhost:3000', 
        },
      ],
    },
    apis: [
      path.join(__dirname, '../../infra/adapters/controller/*.js'), // Caminho corrigido
      path.join(__dirname, '../../application/**/*.js'), // Para documentar services também
      path.join(__dirname, '../../docs/schemas/*.yaml')
    ]
};

const specs = swaggerJsdoc(options);

module.exports = { specs };