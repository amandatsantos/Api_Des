const express = require("express");
const productRoutes = require("./routes/productRoutes");
const initializeDatabase= require("./config/databaseConection");
const initTables = require("./config/databaseConection");



const app = express();
const PORT = 3000;

app.use(express.json());

async function startServer() {
  try {
    // Inicializa o banco de dados
    const db = await initializeDatabase();

    // Inicializa as tabelas
    await initTables(db);

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error.message);
  }
}

startServer();