const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.getCartItems = async function (req, res, next) {
  const cart = await Cart.findOne({ buyer_id: req.user._id })
    .populate("buyer_id")
    .populate("items.productId");

  res.status(200).json({
    status: "success",
    data: cart,
  });
};

exports.createCartItem = async function (req, res, next) {
  let cart = await Cart.findOne({ buyer_id: req.body.buyer_id });

  if (!cart)
    await Cart({
      buyer_id: req.body.buyer_id,
      items: [req.body.item],
    });

  for (const i in cart.items) {
    if (String(cart.items[i].productId) === req.body.item.productId)
      return res.status(200).json({
        message: "data exist",
      });

    cart.items = [...cart.items, req.body.item];
  }

  await cart.save();

  res.status(200).json({
    status: "success",
  });
};

exports.updateCartItem = async function (req, res, next) {
  const { cartItemID } = req.params;

  const cart = await Cart.findOne({ buyer_id: req.body.user_id });

  const newCartItems = cart.items.find((item) => {
    return String(item._id) === cartItemID;
  });

  if (req.body.quantity === newCartItems.quantity || req.body.quantity < 1)
    return next();

  if (req.body.quantity > newCartItems.quantity)
    newCartItems.quantity = req.body.quantity;

  if (req.body.quantity < newCartItems.quantity)
    newCartItems.quantity = req.body.quantity;

  await cart.save();

  res.status(200).json({
    status: "success",
  });
};

exports.deleteCartItem = async function (req, res, next) {
  const { cartItemID } = req.params;

  const cart = await Cart.findOne({ buyer_id: req.body.user_id });

  const newCartItems = cart.items.filter(
    (item) => String(item._id) !== cartItemID,
  );

  cart.items = newCartItems;

  await cart.save();

  res.status(200).json({
    status: "success",
  });
};



/** ADMIN */

exports.deleteAllCartItem = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.getAllCarts = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.deleteCarts = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};
