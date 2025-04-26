const { Sequelize } = require('sequelize');
const config = require('../config/sequelize.database');

const sequelize = new Sequelize(config);

module.exports = sequelize;