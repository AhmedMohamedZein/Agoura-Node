const express = require("express");
const router = express.Router();

const authController = require("../Controllers/authController");

router.post("/", authController.login);

module.exports = router;
