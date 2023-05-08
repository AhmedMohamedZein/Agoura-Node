const express = require("express");
const router = express.Router();

userController = require("../Controllers/userController");

router.post("/register", (req, res) => {
  return res.json("hello");
});

module.exports = router;
