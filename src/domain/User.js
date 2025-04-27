const { ValidationError } = require('sequelize');
const { isEmailValid, isPasswordStrong } = require('../infra/adapters/validations/userValidations');

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    
    this.validate();
  }

  validate() {
    if (!this.name || this.name.trim().length < 3) {
      throw new ValidationError('Erro de validação no name','Nome deve ter pelo menos 3 caracteres');
    }
    
    if (!isEmailValid(this.email)) {
      throw new ValidationError('Erro de validação no email','Email inválido');
    }
    
    if (!isPasswordStrong(this.password)) {
      throw new ValidationError('Erro de validação na senha','Senha deve ter 8+ caracteres, incluindo maiúsculas e números');
    }
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email
    };
  }
}

module.exports = User;