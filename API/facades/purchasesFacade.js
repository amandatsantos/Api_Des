const connectDatabase = require("../config/databaseConnection");
const { validatePurchase } = require("../strategies/purchaseValidation/purchaseValidation");

class PurchasesFacade {
    static async create(data) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {

            const validatedData = validatePurchase(data);


            const id = validatedData.id || crypto.randomUUID();
            const id_client = validatedData.id_client || null;
            const id_product = validatedData.id_product || null;
            const total = validatedData.total ?? null;
            const status = validatedData.status || "finished";

            console.log({ id, id_client, id_product, total, status });


            if (!id_client || !id_product || !total) {
                throw new Error("Campos obrigatórios ausentes: id_client, id_product ou total");
            }

            const query = `
        INSERT INTO ClientBuyProduct (id, id_client, id_product, total, status) 
        VALUES (?, ?, ?, ?, ?)
        `;

            const [result] = await connection.execute(query, [id, id_client, id_product, total, status]);

            return { id, id_client, id_product, total, status };
        } finally {
            connection.release();
        }
    }

    static async update(id, updateData) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {

            if (!updateData.total && !updateData.status) {
                throw new Error("É necessário fornecer o total ou status.");
            }


            const query = `
            UPDATE ClientBuyProduct
            SET total = ?, status = ?
            WHERE id = ?
        `;

            const [result] = await connection.execute(query, [
                updateData.total,
                updateData.status || "finished",
                id
            ]);


            if (result.affectedRows === 0) {
                throw new Error("Compra não encontrada para atualização.");
            }


            return {
                id,
                total: updateData.total,
                status: updateData.status || "finished"
            };
        } finally {
            connection.release();
        }
    }

    static async cancelPurchase(id) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {

            const query = `
            UPDATE ClientBuyProduct
            SET status = 'canceled'
            WHERE id = ?
        `;

            const [result] = await connection.execute(query, [id]);


            if (result.affectedRows === 0) {
                throw new Error("Compra não encontrada para cancelamento.");
            }


            return { id, status: "canceled" };
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


    static async deletePurchase(id) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {

            const queryCheckPurchaseExistence = `
                SELECT COUNT(*) AS count FROM ClientBuyProduct WHERE id = ?
            `;
            const [rows] = await connection.execute(queryCheckPurchaseExistence, [id]);


            if (rows[0].count === 0) {
                throw new Error("Compra não encontrada");
            }


            const queryDeletePurchase = `
                DELETE FROM ClientBuyProduct WHERE id = ?
            `;
            const [result] = await connection.execute(queryDeletePurchase, [id]);


            if (result.affectedRows === 0) {
                throw new Error("Erro ao deletar a compra");
            }

            return { message: "Compra deletada com sucesso" };
        } catch (error) {
            console.error("Erro ao excluir compra:", error);
            throw new Error(error.message);
        } finally {
            connection.release();
        }

    }

    static async getPurchasesByStatus(status) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const query = `
            SELECT id, id_client, id_product, total, status
            FROM ClientBuyProduct
            WHERE status = ?
        `;

            const [purchases] = await connection.execute(query, [status]);

            if (purchases.length === 0) {
                throw new Error(`Nenhuma compra encontrada com status ${status}.`);
            }

            return purchases;
        } finally {
            connection.release();
        }
    }

}

module.exports = PurchasesFacade;
