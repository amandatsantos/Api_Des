const connectDatabase = require("../config/databaseConnection");
const { validatePurchase } = require("../strategies/purchaseValidation/purchaseValidation");

class PurchasesFacade {
    static async create(data) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const validatedData = validatePurchase(data);

            const query = `
        INSERT INTO ClientBuyProduct (id_client, id_product, total, status) 
        VALUES (?, ?, ?, ?)
      `;
            const [result] = await connection.execute(query, [
                validatedData.id_client,
                validatedData.id_product,
                validatedData.total,
                validatedData.status || "finished",
            ]);

            return {
                id_client: validatedData.id_client,
                id_product: validatedData.id_product,
                total: validatedData.total,
                status: validatedData.status || "finished",
            };
        } finally {
            connection.release();
        }
    }

    static async update(id_client, id_product, data) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const validatedData = validatePurchase(data);

            const query = `
        UPDATE ClientBuyProduct
        SET total = ?, status = ?
        WHERE id_client = ? AND id_product = ?
      `;
            const [result] = await connection.execute(query, [
                validatedData.total,
                validatedData.status || "finished",
                id_client,
                id_product,
            ]);

            if (result.affectedRows === 0)
                throw new Error("Compra não encontrada para atualização.");

            return {
                id_client,
                id_product,
                ...validatedData,
                status: validatedData.status || "finished",
            };
        } finally {
            connection.release();
        }
    }

    static async cancelPurchase(id_client, id_product) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const query = `
        UPDATE ClientBuyProduct 
        SET status = 'canceled' 
        WHERE id_client = ? AND id_product = ?
      `;
            const [result] = await connection.execute(query, [id_client, id_product]);

            if (result.affectedRows === 0)
                throw new Error("Compra não encontrada para cancelamento.");

            return { id_client, id_product, status: "canceled" };
        } finally {
            connection.release();
        }
    }

    static async getAll() {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const query = `SELECT * FROM ClientBuyProduct`;
            const [rows] = await connection.execute(query);
            return rows;
        } finally {
            connection.release();
        }
    }

    static async getByClientId(id_client) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const query = `SELECT * FROM ClientBuyProduct WHERE id_client = ?`;
            const [rows] = await connection.execute(query, [id_client]);

            if (rows.length === 0) throw new Error("Nenhuma compra encontrada para este cliente.");

            return rows;
        } finally {
            connection.release();
        }
    }

    static async getById(id_client, id_product) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const query = `SELECT * FROM ClientBuyProduct WHERE id_client = ? AND id_product = ?`;
            const [rows] = await connection.execute(query, [id_client, id_product]);

            if (rows.length === 0) throw new Error("Compra não encontrada.");

            return rows[0];
        } finally {
            connection.release();
        }
    }
}

module.exports = PurchasesFacade;
