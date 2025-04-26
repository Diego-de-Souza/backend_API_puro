# Projeto de API com Node e express puro

## Descrição

Este é um projeto de treino focado no desenvolvimento de uma API utilizando Node.js com suas dependências essenciais, pensado com base na arquitetura hexagonal. Recentemente, concluí um curso sobre arquitetura hexagonal e precisava colocar em prática os conhecimentos adquiridos. Que oportunidade melhor do que juntar o desenvolvimento de uma API com Node.js puro e a aplicação dessa arquitetura?

Apesar de ser um projeto de treino, a aplicação foi desenvolvida pensando na escalabilidade, permitindo o crescimento sem grandes dificuldades e, principalmente, sem a necessidade de mudanças estruturais.

## Desenvolvimento

Para desenvolver nossa API, é necessária a instalação de alguns pacotes e dependências que ajudam a torná-la bem estruturada, segura, escalável e eficiente em termos de persistência de dados.

Abaixo estão descritos todos os pacotes e dependências utilizados, bem como os comandos para instalação:

### Criação da pasta do projeto
```powershel
    mkdir backend_API_puro
    cd backend_API_puro
```
### Iniciação do projeto
Usando o comando "npm init" para criar o arquivo ''**package.json**'' para a API:
```powershell
    npm init
```
Durante a criação, algumas informações serão solicitadas (nome, versão, descrição, etc.). Você pode pressionar ENTER para aceitar os valores padrão, exceto no ponto:

Entry point: altere para app.js, ou mantenha o padrão index.js se preferir.

### instalação do Framework Express
```powershell
    npm i express --save
```
O Express é o framework que facilita o desenvolvimento da aplicação, oferecendo métodos e classes eficientes.

### instalação do swagger
```powershell
    npm install swagger-ui-express swagger-jsdoc --save
```
O Swagger auxilia na documentação dos adaptadores de entrada e saída, gerando uma interface de fácil acesso para testar e visualizar os endpoints da API.

### instalação do JWT
```powershell
    npm i jsonwebtoken
```
JWT é utilizado para geração de tokens, garantindo a segurança na autenticação e autorização de usuários.

### instalação do dotenv
```powershell
    npm i dotenv
```
O Dotenv permite que variáveis de ambiente sejam utilizadas de forma segura no projeto.

### instalando o bcrypt
```powershell
    npm install bcrypt
```
O Bcrypt é utilizado para criptografar senhas, aumentando a segurança da aplicação.

### instalando o sequelize
```powershell
    npm i sequelize
```
Sequelize é um ORM (Object Relational Mapper) que facilita a comunicação entre a aplicação e o banco de dados, abstraindo comandos SQL.

### instalando mysql2
```powershell
    npm i mysql2
```
MySQL2 é o driver utilizado para realizar a conexão do Sequelize com o banco de dados MySQL.

## Dependencias

* [nodeJs](https://nodejs.org/en/download): version 20.11.1

* [Express](https://expressjs.com/pt-br/)

* [swagger](https://swagger.io/)

* [JWT Web Token](https://jwt.io/)

* [dotEnv](https://www.npmjs.com/package/dotenv)

* [bcrypt](https://bcrypt-generator.com/)

* [sequelize](https://sequelize.org/)

* [mysql2](https://www.npmjs.com/package/mysql2)

## Estrutura da aplicação

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

## Observações Finais:

* A estrutura segue o modelo de arquitetura hexagonal (Ports and Adapters).

* A separação clara de camadas facilita a manutenção e a escalabilidade do projeto.

* A implementação de DTOs e validações garante a integridade dos dados.

* O uso do Sequelize torna a camada de persistência mais flexível e padronizada.

* O Swagger proporciona uma excelente documentação automática da API.

## Como Rodar o Projeto Localmente

### Clone o repositório
```bash
    https://github.com/Diego-de-Souza/backend_API_puro
```

### Acesse a pasta do projeto
```bash
    cd backend_API_puro
```

### Instale as dependências
```bash
    npm install
```

### Configure as variáveis de ambiente
Crie um arquivo chamado .env na raiz do projeto com as seguintes variáveis (ajuste conforme sua necessidade):
```powershell
    PORT=3000
    DB_HOST=localhost
    DB_USER=seu_usuario_mysql
    DB_PASSWORD=sua_senha_mysql
    DB_NAME=nome_do_banco
    JWT_SECRET=sua_chave_secreta
```
Obs.: Certifique-se de que o seu banco de dados MySQL esteja rodando e com as credenciais corretas.

### npx sequelize db:migrate
```powershell
    npx sequelize db:migrate
```
(Se ainda não houver migrations, você pode criar o banco manualmente para testes iniciais.)


### Inicie a aplicação
```powershell
    npm run start
```

### A API estará disponível em:
```powershell
    http://localhost:3000
```

### Acesse a documentação Swagger
```powershell
    http://localhost:3000/api-docs
```

Autor: [Diego de Souza L.](https://github.com/Diego-de-Souza)