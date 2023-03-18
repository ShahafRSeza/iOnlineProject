const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 41,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
  },
  price: {
    type: Number,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
    minlength: 6,
  },
  color: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
