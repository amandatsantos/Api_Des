const mysql = require("mysql2/promise");

async function connectDatabase() {
  try {

    const config = {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "root",
    };


    const connection = await mysql.createConnection(config);
    const dbName = process.env.DB_NAME || "loja";


    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

    await connection.end();

    const pool = mysql.createPool({
      ...config,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });


    return pool;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    throw error;
  }
}

module.exports = connectDatabase;
