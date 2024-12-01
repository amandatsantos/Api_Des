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
            const { id_client, id_product } = req.params;
            const updateData = req.body;

            const updatedPurchase = await PurchasesFacade.update(
                id_client,
                id_product,
                updateData
            );

            res.status(200).json(updatedPurchase);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static async cancelPurchase(req, res) {
        try {
            const { id_client, id_product } = req.params;

            const result = await PurchasesFacade.cancelPurchase(id_client, id_product);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = purchasesController;
