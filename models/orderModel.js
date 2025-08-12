const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
  },

  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  image_url: {
    type: String,
  },
});

const Order = model("Order", orderSchema);

module.exports = Order;
