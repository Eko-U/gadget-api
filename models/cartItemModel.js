const CartItemSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },

  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  product_id: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  subtotal: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  },
});



const CartItemModel = model("CartItem", CartItemSchema);
module.exports = CartItemModel;
