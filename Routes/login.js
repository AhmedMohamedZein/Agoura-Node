const express = require("express"); 
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/login", authController.login);
router.post("/google" , authController.login);
router.post("/facebook" , authController.login);

module.exports = router;
