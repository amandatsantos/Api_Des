const initializeDatabase = require("../config/databaseConection");
let db; 

async function getDatabaseConnection() {
  if (!db) {
    db = await initializeDatabase(); 
  }
  return db; 
}

class ProductFacade {
  static async create(data) {
    const db = await getDatabaseConnection(); 

    validateProduct(data); 

    const query = `
      INSERT INTO products (name, brand, price, quantity, status) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [data.name, data.brand, data.price, data.quantity, "active"]);
    return { id: result.insertId, ...data, status: "active" };
  }

  static async update(id, data) {
    const db = await getDatabaseConnection(); 

    validateProduct(data); 

    const query = `
      UPDATE products 
      SET name = ?, brand = ?, price = ?, quantity = ? 
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [data.name, data.brand, data.price, data.quantity, id]);
    if (result.affectedRows === 0) throw new Error("Product not found");

    return { id, ...data };
  }

  static async inactivate(id) {
    const db = await getDatabaseConnection(); 

    const query = `
      UPDATE products 
      SET status = 'inactive' 
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) throw new Error("Product not found");

    return { id, status: "inactive" };
  }

  static async getAll() {
    const db = await getDatabaseConnection();

    const query = `SELECT * FROM products`;
    const [rows] = await db.execute(query);
    return rows;
  }
}

module.exports = ProductFacade;
