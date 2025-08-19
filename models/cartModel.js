const mongoose = require("mongoose");
const Product = require("./productModel");

const { Schema, model } = mongoose;

const CartSchema = new Schema({
  buyer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      quantity: { type: Number, default: 1, min: 1 },
      price: { type: Number, default: 0 },
    },
  ],

  totalPrice: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  },
});

CartSchema.pre("save", async function (next) {
  let totalPrice = 0;

  for (const item of this.items) {
    const product = await Product.findById(item.productId);

    if (!product) continue;

    item.price = product.price * item.quantity;
    totalPrice += item.price;
  }

  this.totalPrice = totalPrice;
  next();
});

const Cart = model("Cart", CartSchema);
module.exports = Cart;
