// Esta é a interface que o Service conhece
class UserRepository {
    async save(user) {
      throw new Error('Método save não implementado');
    }
  
    async findByEmail(email) {
      throw new Error('Método findByEmail não implementado');
    }
  
    async findById(id) {
      throw new Error('Método findById não implementado');
    }
  
    async findAll() {
      throw new Error('Método findAll não implementado');
    }
  
    async update(id, updates) {
      throw new Error('Método update não implementado');
    }
  
    async delete(id) {
      throw new Error('Método delete não implementado');
    }
  }
  
  module.exports = UserRepository;