const express = require('express');
const CreateUserDTO = require('../DTOs')
const ValidationError = require('../../../exceptions/ValidationError');
const {CreateUserDTO, CreateLoginDTO} = require('../DTOs');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: api de gerenciamento de usuários
 */
class UserController {
  constructor(userService) {
    this.userService = userService;
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.create.bind(this));
    this.router.post('/login', this.login.bind(this));
    this.router.get('/', this.findAll.bind(this));
    this.router.get('/:id', this.findById.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  /**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     description: |
 *       Cria um novo usuário após validar:
 *       - Formato de e-mail válido
 *       - Senha com mínimo 8 caracteres, contendo maiúsculas e números
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 *             validUser:
 *               value:
 *                 name: Maria Souza
 *                 email: maria@example.com
 *                 password: SenhaForte456
 *             invalidUser:
 *               value:
 *                 name: João
 *                 email: email-invalido
 *                 password: 123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: "123e4567-e89b-12d3-a456-426614174000"
 *               name: Maria Souza
 *               email: maria@example.com
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               invalidEmail:
 *                 value:
 *                   error: "Email inválido"
 *               weakPassword:
 *                 value:
 *                   error: "Senha precisa ter 8+ caracteres, maiúsculas e números"
 *       409:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               invalidEmail:
 *                 value:
 *                   error: "Email ja existente"
 *       500:
 *         description: Erro interno do servidor
 */
  async create(req, res) {
    try {

      const CreateUserDTO = new CreateUserDTO(req.body);
      
      const user = await this.userService.createUser(CreateUserDTO);

      res.status(201).json(user);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: error.name || 'InternalServerError',
        message: error.message || 'Erro interno no servidor',
        ...(error.details && { details: error.details })
      });
    }
  }

  /**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autentica um usuário e gera um token JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: SenhaForte123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
  async login(req, res) {
    try {
      const createLoginDTO = new CreateLoginDTO(req.body);

      const { user, token } = await this.userService.login(createLoginDTO);

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: error.name || 'InternalServerError',
        message: error.message || 'Erro interno no servidor',
        ...(error.details && { details: error.details })
      });
    }
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Busca todos os usuarios cadastrados
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: Usuarios encontrados com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       500:
   *         description: Erro interno do servidor
   */
  async findAll(req, res) {
    try {
      const users = await this.userService.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: error.name || 'InternalServerError',
        message: error.message || 'Erro interno no servidor',
        ...(error.details && { details: error.details })
      });
    }
  }

  /**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtém detalhes de um usuário específico
 *     description: Retorna os dados completos de um usuário pelo seu ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *         description: ID único do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               name: "João Silva"
 *               email: "joao@example.com"
 *               isActive: true
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Usuário não encontrado"
 *       500:
 *         description: Erro interno do servidor
 */
  async findById(req,res){
    try{
      const user_id = req.params.id;

      if (!user_id) throw new ValidationError('Campos obrigatórios faltando', 'A variavel id está vazia');

      const data_user = await this.userService.findById(user_id);

      res.status(200).json(data_user);
    }catch(error){
      res.status(error.statusCode || 500).json({
        error: error.name || 'InternalServerError',
        message: error.message || 'Erro interno no servidor',
        ...(error.details && { details: error.details })
      });
    }
  }

  /**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza o status de um usuário
 *     description: Rota específica para atualizar status/flags do usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
  async update(req, res){
    try{
      const user_id = req.params.id;
      const CreateUpdateUserDTO = new CreateUserDTO(req.body);

      const user = await this.userService.updateUser(user_id, CreateUpdateUserDTO);
      
      res.status(201).json(user);
    }catch(error){
      res.status(error.statusCode || 500).json({
        error: error.name || 'InternalServerError',
        message: error.message || 'Erro interno no servidor',
        ...(error.details && { details: error.details })
      });
    }
  }

  /**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário permanentemente
 *     description: Exclui um usuário do sistema pelo seu ID. Esta ação é irreversível.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *         description: ID único do usuário a ser removido
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso (sem conteúdo retornado)
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Usuário não encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Não foi possível excluir o usuário"
 */
  async delete(req,res){
    try{
      const user_id = req.params.id;

      if (!user_id) throw new ValidationError('Campos obrigatórios faltando', 'A variavel id está vazia');

      const user = await this.userService.deleteUser(user_id);
      res.status(204).json();
    }catch(error){
      res.status(error.statusCode || 500).json({
        error: error.name || 'InternalServerError',
        message: error.message || 'Erro interno no servidor',
        ...(error.details && { details: error.details })
      });
    }
  }

}

module.exports = UserController;