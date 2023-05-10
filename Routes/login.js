const express = require("express"); 
const router = express.Router();
const loginController = require("../Controllers/Auth/LoginController");

router.post("/login", loginController.login);
router.post("/google" , loginController.login);
router.post("/facebook" , loginController.login);

module.exports = router;
