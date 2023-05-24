const express = require("express");
const router = express.Router();

const registerController = require("../Controllers/RegisterController");
const isGuest = require("../Middlewares/isGuest");

router.post("", isGuest, registerController.register);

module.exports = router;
