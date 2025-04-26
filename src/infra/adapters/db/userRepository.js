const UserModel = require('./sequelize/userModel');
const PasswordService = require('../../../application/security/passwordService');

class UserRepository {
  async save(userData) {
    const user = await UserModel.create(userData);
    const { password, ...safeUser } = user.get({ plain: true });
    return safeUser;
  }

  async findByEmail(email) {
    return UserModel.findOne({ 
      where: { email },
      raw: true
    });
  }

  async findById(id) {
    return UserModel.findByPk(id, {
      attributes: { exclude: ['password'] },
      raw: true
    });
  }

  async findAll() {
    return UserModel.findAll({
      attributes: { exclude: ['password'] },
      raw: true
    });
  }

  async update(id, updates) {
    const [affectedRows] = await UserModel.update(updates, {
      where: { id },
      returning: true,
      plain: true
    });
    return affectedRows ? await this.findById(id) : null;
  }

  async delete(id) {
    const deletedCount = await UserModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

module.exports = UserRepository;