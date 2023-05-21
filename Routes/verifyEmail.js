const express = require("express");
const router = express.Router();

const verifyEmailController = require("../Controllers/VerifyEmail");

router.get("", verifyEmailController.emailSender);
router.post("/confirm", verifyEmailController.emailVerifire);

module.exports = router;
