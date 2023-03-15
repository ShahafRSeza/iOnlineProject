const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/auth");
const _ = require("lodash");

// Get Logged in User Details
router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.payload._id);
    res.status(200).send(_.pick(user, ["id", "name", "email", "isAdmin"]));
  } catch (error) {
    res.status(400).send("Error in get Users");
  }
});
module.exports = router;
