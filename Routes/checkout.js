const express = require("express");
const router = express.Router();
const checkoutController = require("../Controllers/checkoutController");
const isUser = require("../Middlewares/isUser");
const isAdmin = require("../Middlewares/isAdmin");

router.get("/:id" ,checkoutController.orderDetails);
router.post("/:id", isUser,checkoutController.checkout);




module.exports = router;
