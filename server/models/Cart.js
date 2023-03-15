const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
      title: String,
      price: Number,
      color: String,
      category: String,
      description: String,
      image: String,
    },
  ],
  active: {
    type: Boolean,
    required: true,
  },
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
