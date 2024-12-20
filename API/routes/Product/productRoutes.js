const express = require("express");
const ProductController = require("../../controllers/productController");

// enqunto cria as rotas documentar !!

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Produto A"
 *               brand:
 *                 type: string
 *                 example: "Marca X"
 *               price:
 *                 type: number
 *                 example: 99.99
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post("/products", ProductController.createProduct);

/**
 * @swagger
 * /products/status:
 *   get:
 *     summary: Lista os produtos por status (ativo ou inativo)
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Status do produto (ativo ou inativo)
 *     responses:
 *       200:
 *         description: Lista de produtos filtrados por status
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
 *                     example: "active"
 */
router.get("/products/status", ProductController.getProductsByStatus);






/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca as informações de um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Detalhes do produto
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
 *                   example: "Produto A"
 *                 brand:
 *                   type: string
 *                   example: "Marca X"
 *                 price:
 *                   type: number
 *                   example: 99.99
 *                 quantity:
 *                   type: integer
 *                   example: 10
 *                 status:
 *                   type: string
 *                   example: "active"
 *       404:
 *         description: Produto não encontrado
 */
router.get("/products/:id", ProductController.getById);





/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
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
 *                     example: "Produto A"
 *                   brand:
 *                     type: string
 *                     example: "Marca X"
 *                   price:
 *                     type: number
 *                     example: 99.99
 *                   quantity:
 *                     type: integer
 *                     example: 10
 *                   status:
 *                     type: string
 *                     example: "active"
 */
router.get("/products", ProductController.getAllProducts);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza as informações de um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Produto Atualizado"
 *               brand:
 *                 type: string
 *                 example: "Nova Marca"
 *               price:
 *                 type: number
 *                 example: 150.0
 *               quantity:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */
router.put("/products/:id", ProductController.updateProduct);


/**
 * @swagger
 * /products/{id}/inactivate:
 *   delete:
 *     summary: Inativa um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto a ser inativado
 *     responses:
 *       200:
 *         description: Produto inativado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/products/:id/inactivate", ProductController.inactivateProduct);



/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     summary: deleta um products pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: deleta cproducts
 *     responses:
 *       200:
 *         description: products deletado com sucesso
 *       404:
 *         description: products não encontrado
 */

router.delete("/products/delete/:id", ProductController.deleteProduct);
module.exports = router;
