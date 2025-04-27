const User = require('../domain/User');
const PasswordService = require('./security/passwordService');
const TokenService = require('./security/tokenService');
const ConflictError = require('../exceptions/ConflictError');
const NotFoundError = require('../exceptions/NotFoundError')

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.passwordService = new PasswordService();
    this.tokenService = new TokenService();
  }

  async createUser(userData) {
    const exists = await this.userRepository.findByEmail(userData.email);
    if (exists) throw new ConflictError('Conflito de dados', 'o email já está registrado no banco');

    const hashedPassword = await this.passwordService.hashPassword(userData.password);

    const user = new User(
      userData.name,
      userData.email,
      hashedPassword
    );

    return this.userRepository.save(user);
  }

  async login(dataLogin) {
    const user = await this.userRepository.findByEmail(dataLogin.email);
    if (!user) throw new NotFoundError('Credenciais inválidas', 'Não foi encontrado nenhum registro com o email informado');

    const isValid = await this.passwordService.comparePassword(dataLogin.password, user.password);
    if (!isValid) throw new NotFoundError('Credenciais inválidas', 'A senha fornecida não confere com a cadastrada');

    const token = this.tokenService.generateToken({
      id: user.id,
      email: user.email,
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async findAllUsers(){
    const allUsers = await this.userRepository.findAll();
    if(!allUsers) throw new NotFoundError('Não encontrado', 'Não foi possível buscar os dados solicitados');
    return allUsers;
  }

  async findById(user_id){
    const user = await this.userRepository.findById(user_id);
    if(!user) throw new NotFoundError('Não encontrado', 'Não foi possível encontrar o registro com o id fornecido');
    return user;
  }

  async updateUser(user_id, userData){
    const existingUser = await this.userRepository.findById(user_id);
    if (!existingUser) {
        throw new NotFoundError('Não encontrado', 'Não foi possível fazer a atualização dos dados');
    }

    if (!userData.email) {
        throw new NotFoundError('Não encontrado', 'A variavel de email passada está vazia');
    }
    
    if (userData.password) {
      userData.password = await this.passwordService.hashPassword(userData.password);
    }

    const updatedUser = await this.userRepository.update(user_id, userData);
    
    if (!updatedUser) {
      throw new Error('Falha ao atualizar usuário no banco de dados');
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(user_id){
    const deletedUser = await this.userRepository.delete(user_id);
    if(!deletedUser) throw new NotFoundError('Não encontrado', 'O usuário para ser removido não foi encontrado');
    return deletedUser;
  }
}

module.exports = UserService;