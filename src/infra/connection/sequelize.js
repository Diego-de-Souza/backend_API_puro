const { Sequelize } = require('sequelize');
const config = require('../config/sequelize.database');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    define: config.define,
  }
);

module.exports = sequelize;
