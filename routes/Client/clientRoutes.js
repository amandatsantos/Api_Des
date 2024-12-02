const express = require("express");
const ClientController = require("../../controllers/clientController");

const router = express.Router();

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Cria um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao.silva@email.com"
 *               bornDate:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
router.post("/clients", ClientController.createClient);


/**
 * @swagger
 * /clients/status:
 *   get:
 *     summary: Lista os clientes por status (ativo ou inativo)
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Status do cliente (ativo ou inativo)
 *     responses:
 *       200:
 *         description: Lista de clientes filtrados por status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   status:
 *                     type: string
 *                     example: "inactive"
 */
router.get("/clients/status", ClientController.getClientsByStatus);





/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Busca as informações de um cliente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Detalhes do cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123"
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@email.com"
 *                 bornDate:
 *                   type: string
 *                   format: date
 *                   example: "1990-05-15"
 *                 status:
 *                   type: string
 *                   example: "active"
 *       404:
 *         description: Cliente não encontrado
 */
router.get("/clients/:id", ClientController.getById);




/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualiza as informações de um cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva Atualizado"
 *               email:
 *                 type: string
 *                 example: "joao.silva@email.com"
 *               bornDate:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *               status:
 *                 type: string
 *                 enum: ['active', 'inactive']
 *                 example: 'inactive'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 */
router.put("/clients/:id", ClientController.updateClient);





/**
 * @swagger
 * /clients/{id}/inactivate:
 *   delete:
 *     summary: Inativa um cliente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente a ser inativado
 *     responses:
 *       200:
 *         description: Cliente inativado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */


router.delete("/clients/:id/inactivate", ClientController.inactivateClient);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Lista todos os clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123"
 *                   name:
 *                     type: string
 *                     example: "João Silva"
 *                   email:
 *                     type: string
 *                     example: "joao.silva@email.com"
 *                   bornDate:
 *                     type: string
 *                     format: date
 *                     example: "1990-05-15"
 *                   status:
 *                     type: string
 *                     example: "active"
 */

router.get("/clients", ClientController.getAllClients);


/**
 * @swagger
 * /clients/delete/{id}:
 *   delete:
 *     summary: deleta um cliente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: deleta cliente
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */

router.delete("/clients/delete/:id", ClientController.deleteClient);



module.exports = router;
