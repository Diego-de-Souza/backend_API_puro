const {isEmailValid, isPasswordStrong} = require('../validations/userValidations');
const ValidationError = require('../../../exceptions/ValidationError');

class CreateUserDTO {
  constructor({ name, email, password }) {
    const invalidFields = [];
    if(!name) invalidFields.push('name');
    if (!email || !isEmailValid(email)) {
        invalidFields.push('email');
    }
    if (!password || !isPasswordStrong(password)) {
        invalidFields.push('password');
    }

    if (invalidFields.length > 0) {
        throw new ValidationError('Campos obrigatórios faltando', { invalidFields });
    }

    this.name = name;
    this.email = email;
    this.password = password;
  }
}

module.exports = CreateUserDTO;