const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");

// sign-Up Schema of Joi
const signUpSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().min(6).email(),
  password: joi.string().required().min(8),
  isAdmin: joi.boolean().default(false),
});

router.post("/", async (req, res) => {
  try {
    // Joi Validation
    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Check if user exist
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send("User already exists in Data Base");
    }

    // Create User
    user = new User(req.body);

    // Encryption to password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // create Cart for user
    let cart = new Cart({
      userId: user._id,
      products: [],
      active: true,
    });
    await cart.save();

    // Create Token
    const generatedToken = jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.secretKey
    );

    // Saving User
    await user.save();
    res.status(201).send({ token: generatedToken });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
