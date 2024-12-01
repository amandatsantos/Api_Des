const ClientFacade = require("../facades/clientFacade");
const Client = require("../models/client");

class ClientController {

    static async createClient(req, res) {
        try {
            // Verifica se req.body está presente
            // if (!req.body) {
            //     return res.status(400).json({ error: "Corpo da requisição não encontrado." });
            // }

            const { name, email, bornDate } = req.body;

            // Valida se os campos necessários estão presentes
            // if (!name || !email || !bornDate) {
            //     return res.status(400).json({ error: "Nome, email e data de nascimento são obrigatórios." });
            // }

            const newClient = new Client(null, name, email, bornDate);

            const savedClient = await ClientFacade.create({
                name: newClient.name,
                email: newClient.email,
                bornDate: newClient.bornDate,
            });

            res.status(201).json(savedClient);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static async updateClient(req, res) {
        try {
            const id = req.params.id;
            const { name, email, bornDate, status } = req.body;


            if (!name && !email && !bornDate && !status) {
                return res.status(400).json({ error: "Pelo menos um campo precisa ser fornecido para atualização." });
            }

            const updatedClient = await ClientFacade.update(id, { name, email, bornDate, status });
            res.json(updatedClient);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static async inactivateClient(req, res) {
        try {
            const id = req.params.id;
            const result = await ClientFacade.inactivate(id);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllClients(req, res) {
        try {
            const clients = await ClientFacade.getAll();
            res.json(clients);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const client = await ClientFacade.getById(id);
            if (!client) {
                return res.status(404).json({ error: "Cliente não encontrado" });
            }
            res.status(200).json(client);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Erro ao buscar cliente" });
        }
    }

    static async deleteClient(req, res) {
        const { id } = req.params;

        try {
            const result = await ClientFacade.delete(id);
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = ClientController;
