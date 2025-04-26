const User = require('../domain/User');
const PasswordService = require('./security/passwordService');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.passwordService = new PasswordService();
  }

  async createUser(userData) {
    // Validação de email único
    const exists = await this.userRepository.findByEmail(userData.email);
    if (exists) throw new Error('Email já cadastrado');

    // Cria entidade de domínio
    const user = new User(
      null, // ID será gerado pelo banco
      userData.name,
      userData.email,
      userData.password
    );

    // Persiste no banco
    return this.userRepository.save(user);
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Credenciais inválidas');

    const isValid = await this.passwordService.comparePassword(password, user.password);
    if (!isValid) throw new Error('Credenciais inválidas');

    return user;
  }

  async findAllUsers(){
    const allUsers = await this.findAll();
    if(!allUsers) throw new Error('Erro ao buscar usuarios');
    return allUsers;
  }

  async findbyId(user_id){
    const user = await this.userRepository.findById(user_id);
    if(!user) throw new Error('Erro ao buscar usuario pelo id');
    return user;
  }

  async updateUser(user_id){
    const user = await this.userRepository.update(user_id);
    if(!user) throw new Error('Erro ao atualizar dados do usuario pelo id');
    return user;
  }
}

module.exports = UserService;