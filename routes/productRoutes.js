const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.patch("/:id/inactivate", ProductController.inactivate);
router.get("/", ProductController.list);

module.exports = router;
