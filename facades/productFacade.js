const connectDatabase = require("../config/databaseConnection");
const { validateProduct } = require("../strategies/productValidation/productValidation");

class ProductFacade {
  static async create(data) {
    const db = await connectDatabase();
    const connection = await db.getConnection();
    try {
      const validatedData = validateProduct(data);

      const query = `
        INSERT INTO Product (id, name, brand, price, quantity, status) 
        VALUES (UUID(), ?, ?, ?, ?, ?)
      `;
      const [result] = await connection.execute(query, [
        validatedData.name,
        validatedData.brand || null,
        validatedData.price,
        validatedData.quantity,
        "active",
      ]);
      return { id: result.insertId, ...validatedData, status: "active" };
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const db = await connectDatabase();
    const connection = await db.getConnection();
    try {
      const validatedData = validateProduct(data);

      const query = `
        UPDATE Product 
        SET name = ?, brand = ?, price = ?, quantity = ? 
        WHERE id = ?
      `;
      const [result] = await connection.execute(query, [
        validatedData.name,
        validatedData.brand || null,
        validatedData.price,
        validatedData.quantity,
        id,
      ]);
      if (result.affectedRows === 0) throw new Error("Produto não encontrado");

      return { id, ...validatedData };
    } finally {
      connection.release();
    }
  }

  static async inactivate(id) {
    const db = await connectDatabase();
    const connection = await db.getConnection();
    try {
      const query = `
        UPDATE Product 
        SET status = 'inactive' 
        WHERE id = ?
      `;
      const [result] = await connection.execute(query, [id]);
      if (result.affectedRows === 0) throw new Error("Produto não encontrado");

      return { id, status: "inactive" };
    } finally {
      connection.release();
    }
  }

  static async getAll() {
    const db = await connectDatabase();
    const connection = await db.getConnection();
    try {
      const query = `SELECT * FROM Product`;
      const [rows] = await connection.execute(query);
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const db = await connectDatabase();
    const connection = await db.getConnection();
    try {
      const query = `SELECT * FROM Product WHERE id = ?`;
      const [rows] = await connection.execute(query, [id]);
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async deleteProduct(id) {
    const db = await connectDatabase();
    const connection = await db.getConnection();
    try {
      // ve se o produto está vinculado à tabela clientbuyproduct
      const queryCheckRelation = `
            SELECT COUNT(*) AS count FROM clientbuyproduct WHERE id_product = ?
        `;
      const [rows] = await connection.execute(queryCheckRelation, [id]);

      // se tiver registros vinculados, retornar um erro
      if (rows[0].count > 0) {
        throw new Error("Não é possível excluir o produto, pois ele está vinculado a compras.");
      }

      // contrário disso excluir o produto
      const queryDeleteProduct = `
            DELETE FROM Product WHERE id = ?
        `;
      const [result] = await connection.execute(queryDeleteProduct, [id]);

      if (result.affectedRows === 0) throw new Error("Produto não encontrado");

      return { message: "Produto deletado com sucesso" };
    } finally {
      connection.release();
    }
  }
}

module.exports = ProductFacade;
