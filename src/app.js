require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { specs } = require('./infra/config/swagger.config');
const sequelize = require('./infra/connection/sequelize');

const { createUserController } = require('./application/factories/userFactory');

async function appInit() {
  const app = express();
  app.use(express.json());

  app.use('/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }'
    })
  );

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Conexão com o banco estabelecida');

    app.get('/', (req, res) => res.send('API rodando!'));
    app.use('/users', createUserController().router);

    const PORT = process.env.APP_PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Swagger em http://localhost:${PORT}/api-docs`);
    });

  } catch (error) {
    console.error('Falha ao iniciar:', error);
    process.exit(1);
  }
}

appInit();