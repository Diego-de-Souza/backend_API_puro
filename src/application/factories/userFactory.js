const UserRepository = require('../../infra/adapters/db/userRepository');
const UserService = require('../userService');
const UserController = require('../../infra/adapters/controller/userController');

module.exports = {
  createUserController: () => {
    const repository = new UserRepository();
    const service = new UserService(repository);
    return new UserController(service);
  }
};