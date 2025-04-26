const { DataTypes } = require('sequelize');
const sequelize = require('../../../connection/sequelize');
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
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      const passwordService = new PasswordService();
      user.password = await passwordService.hashPassword(user.password);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const passwordService = new PasswordService();
        user.password = await passwordService.hashPassword(user.password);
      }
    }
  }
});

module.exports = User;