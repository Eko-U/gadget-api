const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:productId")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
