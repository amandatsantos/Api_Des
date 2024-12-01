const ProductFacade = require("../facades/productFacade");
const Product = require("../models/product");

class ProductController {

  static async createProduct(req, res) {
    try {
      const { name, brand, price, quantity } = req.body;

      const newProduct = new Product(null, name, brand, price, quantity);


      const savedProduct = await ProductFacade.create({
        name: newProduct.name,
        brand: newProduct.brand,
        price: newProduct.price,
        quantity: newProduct.quantity,
      });

      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      const updatedProduct = await ProductFacade.update(id, data);
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async inactivateProduct(req, res) {
    try {
      const id = req.params.id;

      const result = await ProductFacade.inactivate(id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async getAllProducts(req, res) {
    try {
      const products = await ProductFacade.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async getById(req, res) {
    try {
      const { id } = req.params;


      const product = await ProductFacade.getById(id);

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const result = await ProductFacade.deleteProduct(id);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: error.message });
    }
  }

}


module.exports = ProductController;
