const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authProvidersController");


router.post("/google", authController.googleAuth);

module.exports = router;