const express = require('express');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Dados inválidos
   */
  async create(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: Autentica um usuário
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
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login bem-sucedido
   *       401:
   *         description: Credenciais inválidas
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password);
      res.json(user);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const users = await this.userService.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req,res){
    try{
      const user_id = req.params.id;
      const data_user = await this.userService.findById(user_id);
      res.json(data_user);
    }catch(err){
      res.status(500).json({error: err.message});
    }
  }

  async update(req, res){
    try{
      const user_id = req.params.id;
      const user = await this.userService.updateUser(user_id);
      res.status(201).json(user);
    }catch(err){
      res.status(500).json({error: err.message});
    }
  }

  async delete(req,res){
    try{

    }catch(err){
      res.status(500).json({error: err.message});
    }
  }

}

module.exports = UserController;