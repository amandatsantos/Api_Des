const connectDatabase = require("../config/databaseConnection");
const { validateClient } = require("../strategies/clientValidation/clientValidation");

class ClientFacade {

    static async create(data) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const validatedData = validateClient(data);

            const id = validatedData.id || crypto.randomUUID();
            const query = `
        INSERT INTO Client (id, name, email, bornDate, status)
        VALUES (?, ?, ?, ?, ?)
      `;
            await connection.execute(query, [
                id,
                validatedData.name,
                validatedData.email,
                validatedData.bornDate,
                "active",
            ]);
            return { id, ...validatedData, status: "active" };
        } finally {
            connection.release();
        }
    }

    // Atualizar cliente
    static async update(id, data) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const validatedData = validateClient(data);

            const query = `
        UPDATE Client 
        SET name = ?, email = ?,bornDate = ?
        WHERE id = ?
      `;
            const [result] = await connection.execute(query, [
                validatedData.name,
                validatedData.email,
                id,
            ]);
            if (result.affectedRows === 0) throw new Error("Cliente não encontrado");

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
        UPDATE Client 
        SET status = 'inactive' 
        WHERE id = ?
      `;
            const [result] = await connection.execute(query, [id]);
            if (result.affectedRows === 0) throw new Error("Cliente não encontrado");

            return { id, status: "inactive" };
        } finally {
            connection.release();
        }
    }


    static async getAll() {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const query = `SELECT * FROM Client`;
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
            const query = `SELECT * FROM Client WHERE id = ?`;
            const [rows] = await connection.execute(query, [id]);
            return rows[0];
        } finally {
            connection.release();
        }
    }

    static async delete(id) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            // se o cliente está vinculado à tabela clientbuyproduct
            const queryCheckRelation = `
            SELECT COUNT(*) AS count FROM clientbuyproduct WHERE id_client = ?
        `;
            const [rows] = await connection.execute(queryCheckRelation, [id]);

            // se houver registros vinculados, retornar um aviso
            if (rows[0].count > 0) {
                throw new Error("Não é possível excluir o cliente, pois ele está vinculado a compras.");
            }


            const queryDeleteClient = `
            DELETE FROM Client WHERE id = ?
        `;
            const [result] = await connection.execute(queryDeleteClient, [id]);

            if (result.affectedRows === 0) throw new Error("Cliente não encontrado");

            return { message: "Cliente deletado com sucesso" };
        } finally {
            connection.release();
        }
    }

    static async getClientsByStatus(status) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const query = `
            SELECT id, name, status
            FROM client
            WHERE status = ?
        `;

            const [clients] = await connection.execute(query, [status]);

            if (clients.length === 0) {
                throw new Error(`Nenhum cliente encontrado com status ${status}.`);
            }

            return clients;
        } finally {
            connection.release();
        }
    }
}

module.exports = ClientFacade;
