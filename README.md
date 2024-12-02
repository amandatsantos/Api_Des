# Descrição

Essa API gerencia compras, produtos e clientes, permitindo operações como cadastro, consulta, atualização e cancelamento de compras. Além disso, permite filtrar compras por status e visualizar produtos e clientes ativos/inativos.

# Tecnologias Utilizadas

Node.js: Ambiente de execução JavaScript no backend.

Express.js: Framework para gerenciamento de rotas e middleware.

MySQL: Banco de dados relacional para armazenamento de informações.

Swagger: Documentação interativa da API.

dotenv: Gerenciamento de variáveis de ambiente.

# Requisitos

Node.js (v16 ou superior).

MySQL (v8 ou superior).

Gerenciador de pacotes: npm ou yarn.

# Instalação

Clone o repositório:

git clone <https://github.com/amandatsantos/Api_Des.git>

cd <Api_Des>

# Instale as dependências:

npm install

# Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e preencha com as seguintes informações:

DB\_HOST=localhost

DB\_USER=seu\_usuario

DB\_PASSWORD=sua\_senha

DB\_NAME=nome\_do\_banco

PORT=3000

# Inicialize o banco de dados:

Certifique-se de que o banco de dados MySQL está configurado e rodando. Crie o banco de dados necessário com o nome definido na variável DB\_NAME:

CREATE DATABASE nome\_do\_banco;

# Inicialize o servidor:

npm start

A API estará disponível em: http://localhost:5265

# Documentação da API

A documentação interativa da API pode ser acessada pelo Swagger em:

http://localhost:5265/api-docs

// ou o a porta que definir no arquivo  swaggerConfig.js

# Contribuindo

Faça um fork do projeto.

Crie uma branch para sua funcionalidade:

git checkout -b minha-funcionalidade

Commit suas alterações:

git commit -m 'Adicionei uma nova funcionalidade'

Submeta sua branch:

git push origin minha-funcionalidade

Abra um Pull Request.

# Licença
Este projeto está licenciado sob a licença MIT.