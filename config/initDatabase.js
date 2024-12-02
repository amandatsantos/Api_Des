async function initTables(db) {
  try {
    const connection = await db.getConnection(); // conexão do pool
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Client (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        bornDate DATE NOT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active'
      )
    `);


    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Product (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255),
        price DECIMAL(10, 2) NOT NULL,
        quantity INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active'
      )
    `);


    await connection.execute(`
     CREATE TABLE IF NOT EXISTS ClientBuyProduct (
    id CHAR(36) NOT NULL PRIMARY KEY, 
    id_client CHAR(36) NOT NULL, 
    id_product CHAR(36) NOT NULL, 
    total DECIMAL(10, 2) NOT NULL, 
    status ENUM('finished', 'canceled') DEFAULT 'finished', 
    UNIQUE KEY unique_client_product (id_client, id_product), 
    FOREIGN KEY (id_client) REFERENCES Client(id), 
    FOREIGN KEY (id_product) REFERENCES Product(id) 
  
    );`);

    console.log("Tabelas verificadas/criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error.message);
    throw error;
  }
}

module.exports = initTables;
