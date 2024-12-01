const express = require("express");
const PurchasesController = require("../../controllers/purchasesController");

const router = express.Router();

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Cria uma nova compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_client:
 *                 type: string
 *                 example: "12345"
 *               id_product:
 *                 type: string
 *                 example: "67890"
 *               total:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 */
router.post("/purchases", PurchasesController.createPurchase);

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: Lista todas as compras
 *     responses:
 *       200:
 *         description: Lista de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_client:
 *                     type: string
 *                     example: "12345"
 *                   id_product:
 *                     type: string
 *                     example: "67890"
 *                   total:
 *                     type: integer
 *                     example: 2
 */
router.get("/purchases", PurchasesController.getAllPurchases);

/**
 * @swagger
 * /purchases/{id_client}:
 *   get:
 *     summary: Busca compras realizadas por um cliente específico
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Lista de compras do cliente
 */
router.get("/purchases/:id_client", PurchasesController.getPurchasesByClient);

/**
 * @swagger
 * /purchases/{id_client}/{id_product}:
 *   put:
 *     summary: Atualiza o status de uma compra
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "delivered"
 *     responses:
 *       200:
 *         description: Status da compra atualizado com sucesso
 */
router.put("/purchases/:id_client/:id_product", PurchasesController.updatePurchase);

/**
 * @swagger
 * /purchases/{id_client}/{id_product}:
 *   delete:
 *     summary: cancela uma compra
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Compra cancelada com sucesso
 */
router.delete("/purchases/:id_client/:id_product", PurchasesController.cancelPurchase);

module.exports = router;
