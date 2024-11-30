const express = require("express");
const connectDatabase = require("./config/databaseConnection");
const initTables = require("./config/initDatabase");
const setupSwagger = require("./swaggerConfig"); 

async function startServer() {
  try {
    // vai na config do db criar se necessario as tabela e as schemas no db
    const db = await connectDatabase();
    await initTables(db); 

    const app = express();
    app.use(express.json());

    // swagger
    setupSwagger(app);

   
    const productRoutes = require("./routes/productRoutes");
    app.use("/api/", productRoutes);

    // log para mapear as rotas
    app.use((req, res, next) => {
      console.log(`Rota acessada: ${req.method} ${req.path}`);
      next();
    });

    // start
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error.message);
  }
}

startServer();
