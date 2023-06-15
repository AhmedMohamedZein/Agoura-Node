const express = require("express");
const router = express.Router();
const checkoutController = require("../Controllers/checkoutController");
const isUser = require("../Middlewares/isUser");
const isAdmin = require("../Middlewares/isAdmin");

router.get('/fail/:id', checkoutController.fail);
router.get('/success/:id', checkoutController.success);
router.post("/:id", isUser,checkoutController.checkout);
router.get("/:id" ,checkoutController.orderDetails);



module.exports = router;
