const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
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

const Product = model("Product", productSchema);

module.exports = Product;
