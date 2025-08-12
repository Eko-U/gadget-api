const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CartSchema = new Schema({
  buyer_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  status: {
    type: String,
    emuns: ["pending", "shipped", "cancelled", "delivered"],
    default: "pending",
  },

  totalPrice: {
    type: Number,
  },

  shippingAddress: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  },
});

const CartItemSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "order",
  },

  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  product_id: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },

  quantity: {
    type: Number,
  },

  price: {
    type: Number,
  },

  subtotal: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  },
});

const Cart = model("Cart", CartSchema);

exports.CartItem = model("CartItem", CartItemSchema);
module.exports = Cart;
