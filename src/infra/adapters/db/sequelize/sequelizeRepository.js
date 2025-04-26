const UserModel = require('./userModel');

class SequelizeUserRepository {
  async save(user) {
    const { id, name, email, password } = user;
    const [dbUser] = await UserModel.findOrCreate({
      where: { id },
      defaults: { name, email, password },
    });
    return dbUser;
  }

  async findByEmail(email) {
    return UserModel.findOne({ where: { email } });
  }

  async findById(id) {
    return UserModel.findByPk(id);
  }

  async findAll() {
    return UserModel.findAll();
  }

  async update(id, updates) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    
    return user.update(updates);
  }

  async delete(id) {
    const user = await UserModel.findByPk(id);
    if (!user) return false;
    
    await user.destroy();
    return true;
  }
}

module.exports = SequelizeUserRepository;