const { config } = require('dotenv');
const mysql = require('mysql2/promise');


config();

async function connectDatabase() {
  try {

    const dbConfig = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };


    const connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    const dbName = process.env.DB_DATABASE;


    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);


    await connection.end();


    const poolConfig = {
      ...dbConfig,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    // Criar o pool de conexões
    const pool = mysql.createPool(poolConfig);

    return pool;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    throw error;
  }
}

module.exports = connectDatabase;
