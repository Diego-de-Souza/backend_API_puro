const { DataTypes } = require('sequelize');
const sequelize = require('../../../../db');
const PasswordService = require('../../../../application/security/passwordService');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const passwordService = new PasswordService();
        user.password = await passwordService.hashPassword(user.password);
      }
    },
  },
});

module.exports = User;