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
 * /purchases/status:
 *   get:
 *     summary: Lista as compras por status (finalizadas ou canceladas)
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [finished, canceled]
 *         description: Status da compra (finalizada ou cancelada)
 *     responses:
 *       200:
 *         description: Lista de compras filtradas por status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   id_client:
 *                     type: string
 *                   id_product:
 *                     type: string
 *                   total:
 *                     type: integer
 *                   status:
 *                     type: string
 *                     example: "finished"
 */
router.get("/purchases/status", PurchasesController.getPurchasesByStatus);
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
 * /purchases/{id}:
 *   put:
 *     summary: Atualiza o status ou total de uma compra
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "canceled"
 *               total:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Compra atualizada com sucesso
 *       404:
 *         description: Compra não encontrada
 *       400:
 *         description: Parâmetros inválidos
 */
router.put("/purchases/:id", PurchasesController.updatePurchase);


/**
 * @swagger
 * /purchases/delete/{id}:
 *   delete:
 *     summary: Deleta uma compra pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da compra a ser deletada
 *     responses:
 *       200:
 *         description: Compra deletada com sucesso
 *       404:
 *         description: Compra não encontrada
 */

router.delete('/purchases/delete/:id', PurchasesController.deletePurchase);

/**
 * @swagger
 * /purchases/{id}:
 *   delete:
 *     summary: Cancela uma compra pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da compra
 *     responses:
 *       200:
 *         description: Compra cancelada com sucesso
 *       404:
 *         description: Compra não encontrada
 */
router.delete("/purchases/:id", PurchasesController.cancelPurchase);



module.exports = router;
