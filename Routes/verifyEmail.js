const express = require("express");
const router = express.Router();

const verifyEmailController = require("../Controllers/VerifyEmail");

router.post("", verifyEmailController.emailSender);

module.exports = router;
