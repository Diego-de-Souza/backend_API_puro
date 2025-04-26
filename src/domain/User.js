const { isEmailValid, isPasswordStrong } = require('./validations/userValidations');

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    
    this.validate();
  }

  validate() {
    if (!isEmailValid(this.email)) {
      throw new Error('Email inválido');
    }
    
    if (!isPasswordStrong(this.password)) {
      throw new Error('Senha precisa ter 8+ caracteres, maiúsculas e números');
    }
  }
}

module.exports = User;