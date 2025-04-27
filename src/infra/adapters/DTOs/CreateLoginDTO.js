const {isEmailValid} = require('../validations/userValidations');
const ValidationError = require('../../../exceptions/ValidationError');

class CreateLoginDTO {
    constructor({email, password}){
        const invalidFields = [];
        if (!email || !isEmailValid(email)) {
            invalidFields.push('email');
        }
        if (!password) {
            invalidFields.push('password');
        }

        if (invalidFields.length > 0) {
            throw new ValidationError('Campos obrigatórios faltando', { invalidFields });
        }

        this.email = email;
        this.password = password;
    }
}

module.exports = CreateLoginDTO;