const connectDatabase = require("../config/databaseConnection");
const { validateClient } = require("../strategies/clientValidation/clientValidation");

class ClientFacade {

    static async create(data) {
        const db = await connectDatabase();
        const connection = await db.getConnection();
        try {
            const validatedData = validateClient(data);

            const query = `
        INSERT INTO Client (id, name, email, bornDate, status)
        VALUES (UUID(), ?, ?, ?, ?)
      `;
            const [result] = await connection.execute(query, [
                validatedData.name,
                validatedData.email,
                validatedData.bornDate,
                "active",
            ]);
            return { id: result.insertId, ...validatedData, status: "active" };
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
        SET name = ?, email = ?,bornDate = ?, phone = ?
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
}

module.exports = ClientFacade;
