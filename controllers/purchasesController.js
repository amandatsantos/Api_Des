const PurchasesFacade = require("../facades/purchasesFacade");
const Purchase = require("../models/purchases");

class purchasesController {

    static async createPurchase(req, res) {
        try {
            const { id_client, id_product, total, status } = req.body;


            const purchase = new Purchase(id_client, id_product, total, status);

            const createdPurchase = await PurchasesFacade.create(purchase);
            res.status(201).json(createdPurchase);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllPurchases(req, res) {
        try {
            const purchases = await PurchasesFacade.getAll();
            res.status(200).json(purchases);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async getPurchasesByClient(req, res) {
        try {
            const { id_client } = req.params;
            const purchases = await PurchasesFacade.getByClientId(id_client);
            res.status(200).json(purchases);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }


    static async updatePurchase(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;


            if (!updateData.total && !updateData.status) {
                return res.status(400).json({ error: "É necessário fornecer o total ou status para atualizar." });
            }


            const updatedPurchase = await PurchasesFacade.update(id, updateData);

            if (!updatedPurchase) {
                return res.status(404).json({ error: "Compra não encontrada para atualização." });
            }


            res.status(200).json(updatedPurchase);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async cancelPurchase(req, res) {
        try {
            const { id } = req.params;


            const canceledPurchase = await PurchasesFacade.cancelPurchase(id);

            if (!canceledPurchase) {
                return res.status(404).json({ error: "Compra não encontrada para cancelamento." });
            }


            res.status(200).json(canceledPurchase);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletePurchase(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "O campo 'id' é obrigatório" });
            }


            const result = await PurchasesFacade.deletePurchase(id);


            res.status(200).json(result);
        } catch (error) {

            if (error.message === "Compra não encontrada") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    static async getPurchasesByStatus(req, res) {
        try {
            const { status } = req.query;

            if (!['finished', 'canceled'].includes(status)) {
                return res.status(400).json({ error: "Status inválido. Use 'finished' ou 'canceled'." });
            }

            const purchases = await PurchasesFacade.getPurchasesByStatus(status);

            res.status(200).json(purchases);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = purchasesController;
