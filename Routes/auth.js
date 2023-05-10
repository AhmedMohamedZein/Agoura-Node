const express = require("express"); 
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/", authController.login);
router.post("/google" , authController.newLogin);
router.post("/facebook" , authController.newLogin);
module.exports = router;
