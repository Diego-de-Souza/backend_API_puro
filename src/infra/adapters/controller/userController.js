const express = require('express');
const ValidationError = require('../../../exceptions/ValidationError');
const CreateUserDTO = require('../DTOs/CreateUserDTO');
const CreateLoginDTO = require('../DTOs/CreateLoginDTO');

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
    this.userDTO = CreateUserDTO;
    this.loginDTO = CreateLoginDTO;
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
 *               createdAt: "2025-04-26T12:34:56.789Z"
 *               updatedAt: "2025-04-26T12:34:56.789Z"
 *       400:
 *         description: "Erro de validação"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ValidationError"
 *                 message:
 *                   type: string
 *                   example: "Campos obrigatórios faltando"
 *                 details:
 *                   type: object
 *                   properties:
 *                     invalidFields:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["email", "password"]
 *             examples:
 *               invalidEmail:
 *                 value:
 *                   error: "ValidationError"
 *                   message: "Formato de e-mail inválido"
 *                   details:
 *                     invalidFields:
 *                       - "email"
 *               weakPassword:
 *                 value:
 *                   error: "ValidationError"
 *                   message: "Senha precisa ter 8+ caracteres, maiúsculas e números"
 *                   details:
 *                     invalidFields:
 *                       - "password"
 *       409:
 *         description: "Conflito de dados"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ConflictError"
 *                 message:
 *                   type: string
 *                   example: "Conflito de dados"
 *                 details:
 *                   type: string
 *                   example: "O email já está registrado no banco"
 *             examples:
 *               emailConflict:
 *                 value:
 *                   error: "ConflictError"
 *                   message: "Conflito de dados"
 *                   details: "O email já está registrado no banco"
 *       500:
 *         description: Erro interno do servidor
 */
  async create(req, res) {
    try {

      const userDTO = new this.userDTO(req.body)
      
      const user = await this.userService.createUser(userDTO);

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
 *         description: Login bem-sucedido, token gerado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     name:
 *                       type: string
 *                       example: Maria Souza
 *                     email:
 *                       type: string
 *                       example: maria@example.com
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-26T12:34:56.789Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-26T12:34:56.789Z"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       404:
 *         description: Credenciais inválidas, usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "NotFoundError"
 *                 message:
 *                   type: string
 *                   example: "Credenciais inválidas"
 *                 details:
 *                   type: string
 *                   example: "Não foi encontrado nenhum registro com o email informado"
 */
  async login(req, res) {
    try {
      const loginDTO = new this.loginDTO(req.body);

      const { user, token } = await this.userService.login(loginDTO);

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
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Usuário não encontrado com o id fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "NotFoundError"
 *                 message:
 *                   type: string
 *                   example: "Não encontrado"
 *                 details:
 *                   type: string
 *                   example: "Não foi possível encontrar o registro com o id fornecido"
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
 *         description: ID único do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Maria Souza"
 *               email:
 *                 type: string
 *                 example: "maria@example.com"
 *               password:
 *                 type: string
 *                 example: "SenhaForte456"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               name: "Maria Souza"
 *               email: "maria@example.com"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "NotFoundError"
 *                 message:
 *                   type: string
 *                   example: "Não encontrado"
 *                 details:
 *                   type: string
 *                   example: "Não foi possível encontrar o registro com o id fornecido"
 *       500:
 *         description: Erro interno no servidor
 */
  async update(req, res){
    try{
      const user_id = req.params.id;
      const updateUserDTO = new this.userDTO(req.body);

      const user = await this.userService.updateUser(user_id, updateUserDTO);
      
      res.status(200).json(user);
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
 *               error: "NotFoundError"
 *               message: "Não encontrado"
 *               details: "O usuário para ser removido não foi encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "ErroInterno"
 *               message: "Não foi possível excluir o usuário"
 *               details: "Detalhes adicionais do erro"
 */
  async delete(req,res){
    try{
      const user_id = req.params.id;

      if (!user_id) throw new ValidationError('Campos obrigatórios faltando', 'A variavel id está vazia');

      const user = await this.userService.deleteUser(user_id);
      res.status(204).send();
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