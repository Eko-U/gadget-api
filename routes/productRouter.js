const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  restrictTo,
  uploadProductPhoto,
} = require("../controllers/productController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get( getAllProducts)
  .post(
    protect,
    restrictTo("buyer", "seller", "admin"),
    uploadProductPhoto,
    createProduct,
  );

router.route("/:productId").get(getProduct);
// .patch(restrictTo("seller", "seller", "admin"), updateProduct)
// .delete(restrictTo("seller", "admin"), deleteProduct);

module.exports = router;
