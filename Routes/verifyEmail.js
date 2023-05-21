const express = require("express");
const router = express.Router();

const verifyEmailController = require("../Controllers/VerifyEmail");

router.get("/:id", verifyEmailController.emailSender);
router.get("/confirm/:id", verifyEmailController.emailVerifier);

module.exports = router;
