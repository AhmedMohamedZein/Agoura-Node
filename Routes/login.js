const express = require("express");
const router = express.Router();
const loginController = require("../Controllers/Auth/LoginController");
const isGuest = require("../Middlewares/isGuest");

router.post("/login", isGuest, loginController.login);
router.post("/google", loginController.login);
router.post("/facebook", loginController.login);

module.exports = router;
