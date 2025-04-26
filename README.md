# API Project with Pure Node and Express

## Description

This is a training project focused on developing an API using Node.js with its essential dependencies, designed based on hexagonal architecture. I recently completed a course on hexagonal architecture and needed to put the knowledge acquired into practice. What better opportunity than combining API development with pure Node.js and the application of this architecture?

Although this is a training project, the application was developed with scalability in mind, allowing it to grow without major difficulties and, most importantly, without requiring structural changes.

## Development

To develop our API, it is necessary to install some packages and dependencies that help make it well-structured, secure, scalable, and efficient in terms of data persistence.

Below are all the packages and dependencies used, as well as the commands for installation:

### Create the project folder
```powershel
    mkdir backend_API_puro
    cd backend_API_puro
```
### Initialize the project
Using the command npm init to create the ''package.json'' file for the API:
```powershell
    npm init
```
During creation, some information will be requested (name, version, description, etc.). You can press ENTER to accept the default values, except at:

Entry point: change to app.js, or keep the default index.js if you prefer.

### Install the Express framework
```powershell
    npm i express --save
```
Express is the framework that facilitates application development, offering efficient methods and classes.

### Install Swagger
```powershell
    npm install swagger-ui-express swagger-jsdoc --save
```
Swagger helps document the input and output adapters, generating an easy-to-use interface to test and visualize the API endpoints.

### Install JWT
```powershell
    npm i jsonwebtoken
```
JWT is used to generate tokens, ensuring security in user authentication and authorization.

### Install dotenv
```powershell
    npm i dotenv
```
Dotenv allows environment variables to be used securely in the project.

### Install bcrypt
```powershell
    npm install bcrypt
```
Bcrypt is used to encrypt passwords, increasing application security.

### Install Sequelize
```powershell
    npm i sequelize
```
Sequelize is an ORM (Object Relational Mapper) that facilitates communication between the application and the database, abstracting SQL commands.

### Install mysql2
```powershell
    npm i mysql2
```
MySQL2 is the driver used to connect Sequelize to the MySQL database.

## Dependencias

* [nodeJs](https://nodejs.org/en/download): version 20.11.1

* [Express](https://expressjs.com/pt-br/)

* [swagger](https://swagger.io/)

* [JWT Web Token](https://jwt.io/)

* [dotEnv](https://www.npmjs.com/package/dotenv)

* [bcrypt](https://bcrypt-generator.com/)

* [sequelize](https://sequelize.org/)

* [mysql2](https://www.npmjs.com/package/mysql2)


## Application Structure

```powershell
    src/
    │
    ├── docs/ 
    |   └── schemas/
    |       └── user.schema.yaml
    |
    ├── domain/         # O coração - regras de negócio
    │   └── User.js       # Entidade usuário
    │
    ├── application/  
    |   ├── factories/    # Casos de uso
    |   |   ├── userFactory.js
    |   ├── security/
    |   |   ├── passwordService.js
    │   └── userService.js
    │
    ├── infra/   # Adaptadores e coisas técnicas
    │   ├── adapters/
    │   │   ├── controller/     # Adaptadores primários (entrada)
    │   │   │   └── userController.js
    │   │   ├── db/       # Adaptadores secundários (saída)
    |   |   |   ├── sequelize/
    |   |   |   |   └──userModel.js
    │   │   |   └── userRepository.js
    |   |   ├── DTOs/
    |   |   |   ├── CreateLoginDTO.js
    |   |   |   ├── CreateUserDTO.js
    |   |   |   └── index.DTOs.js
    |   |   └── validations/
    |   |       └── userValidations.js
    |   ├── connection/
    |   |   └── sequelize.js
    │   └── config/
    |       ├── sequelize.database.js
    │       └── swagger.config.js
    │
    ├── exceptions/
    |   ├── ConflictError.js
    |   ├── DomainError.js
    |   ├── NotFoundError.js
    |   ├── UnauthorizedError.js
    |   ├── ValidationError.js
    |
    └── app.js
```

## Final Notes:

* The structure follows the hexagonal architecture model (Ports and Adapters).

* The clear separation of layers facilitates maintenance and scalability.

* The implementation of DTOs and validations ensures data integrity.

* Using Sequelize makes the persistence layer more flexible and standardized.

* Swagger provides excellent automatic API documentation.

## How to Run the Project Locally

### Clone the repository
```bash
    https://github.com/Diego-de-Souza/backend_API_puro
```

### Access the project folder
```bash
    cd backend_API_puro
```

### Install the dependencies
```bash
    npm install
```

### Configure environment variables
Create a file called .env in the project root with the following variables (adjust them as needed):
```powershell
    PORT=3000
    DB_HOST=localhost
    DB_USER=seu_usuario_mysql
    DB_PASSWORD=sua_senha_mysql
    DB_NAME=nome_do_banco
    JWT_SECRET=sua_chave_secreta
```
Note: Make sure your MySQL database is running and the credentials are correct.

### Run Sequelize migrations
```powershell
    npx sequelize db:migrate
```
(If there are no migrations yet, you can manually create the database for initial testing.)

### Start the application
```powershell
    npm run start
```

### The API will be available at:
```powershell
    http://localhost:3000
```

### Access the Swagger documentation
```powershell
    http://localhost:3000/api-docs
```

Author: [Diego de Souza L.](https://github.com/Diego-de-Souza)