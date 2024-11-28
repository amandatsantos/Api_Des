const ProductFacade = require("../facades/productFacades");

class ProductController {
  static async create(req, res) {
    try {
      const product = await ProductFacade.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const product = await ProductFacade.update(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async inactivate(req, res) {
    try {
      const product = await ProductFacade.inactivate(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async list(req, res) {
    try {
      const products = await ProductFacade.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
