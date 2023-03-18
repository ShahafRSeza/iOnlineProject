const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const joi = require("joi");
const Cart = require("../models/Cart");

// Product Schema
const productSchema = joi.object({
  productId: joi.string(),
  title: joi.string().required().min(2).max(41),
  category: joi.string().required().min(2),
  color: joi.string().required().min(2),
  price: joi.number().required().min(2),
  description: joi.string().required().min(6),
  image: joi.string().required(),
});

// Add Product to User Cart
router.post("/", auth, async (req, res) => {
  try {
    // Validate request body
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const userId = req.payload._id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [],
        active: true,
      });
    }

    // Add product to user's cart
    cart.products.push(req.body);
    await cart.save();
    res.status(200).send(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get Products in Cart
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.payload._id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [],
        active: true,
      });
    }

    res.status(200).send(cart.products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete Product From Cart
router.delete("/:id", auth, async (req, res) => {
  try {
    const prodId = req.params.id;
    const userId = req.payload._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).send("No cart for this user.");
    }

    const productFilter = cart.products.filter(
      (item) => item.productId == prodId
    );
    let itemIndex = cart.products.indexOf(productFilter[0]);

    if (itemIndex == -1) {
      return res.status(404).send("No such item in cart.");
    } else {
      cart.products.splice(itemIndex, 1);
    }

    await cart.save();
    res.status(200).send(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
// delete all products in cart
router.delete("/", auth, async (req, res) => {
  try {
    const userId = req.payload._id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).send("No cart for this user.");
    }

    cart.products = [];

    await cart.save();
    res.status(200).send("Cart emptied successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
