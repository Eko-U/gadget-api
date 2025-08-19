const express = require("express");
const cartController = require("../controllers/cartController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(protect, cartController.getCartItems)
  .post(cartController.createCartItem)
  .delete(cartController.deleteAllCartItem);

router
  .route("/:cartItemID")
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);

module.exports = router;
