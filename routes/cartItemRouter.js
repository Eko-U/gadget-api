const express = require("express");
const cartItemController = require("../controllers/cartItemController");

const router = express.Router();

router
  .route("/")
  .get(cartItemController.getCartItems)
  .post(cartItemController.createCartItem)
  .delete(cartItemController.deleteAllCartItem);

router
  .route("/:cartItemID")
  .patch(cartItemController.updateCartItem)
  .delete(cartItemController.deleteCartItem);

module.exports = router;
