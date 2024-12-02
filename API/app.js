const express = require("express");
const connectDatabase = require("./config/databaseConnection");
const initTables = require("./config/initDatabase");
const setupSwagger = require("./swaggerConfig");

async function startServer() {
  try {
    // Conecta ao banco de dados e cria tabelas, se necessário
    const db = await connectDatabase();
    await initTables(db);

    const app = express();
    app.use(express.json()); // Middleware para processar JSON nas requisições

    // Configuração do Swagger
    setupSwagger(app);

    // Importa as rotas de produtos e clientes
    const productRoutes = require("./routes/Product/productRoutes");
    const clientRoutes = require("./routes/Client/clientRoutes");
    const purchases = require("./routes/Purchases/purchases")// Importando as rotas de clientes

    // Usa as rotas de produtos e clientes no caminho "/api/"
    app.use("/api/", productRoutes);  // Rotas para produtos
    app.use("/api/", clientRoutes);    // Rotas para clientes
    app.use("/api/", purchases);    // Rotas para clientes


    // Log para mapear as rotas acessadas
    app.use((req, res, next) => {
      console.log(`Rota acessada: ${req.method} ${req.path}`);
      next();
    });

    // Inicia o servidor na porta especificada
    const PORT = process.env.PORT || 5265;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error.message);
  }
}

startServer();
