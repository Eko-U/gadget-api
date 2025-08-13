const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  restrictTo,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts);
// .post(restrictTo("buyer", "seller", "admin"), createProduct);

router.route("/:productId").get(getProduct);
// .patch(restrictTo("seller", "seller", "admin"), updateProduct)
// .delete(restrictTo("seller", "admin"), deleteProduct);

module.exports = router;
