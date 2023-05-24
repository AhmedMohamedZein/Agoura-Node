const express = require("express");
const router = express.Router();
const path = require("path");
const HomeController = require(path.join(__dirname, "../Controllers/Home"));

router.get("/", HomeController.getData);
router.delete("/notifications/:id", HomeController.deleteNotification);
router.delete("/cart/:id", HomeController.deleteItemFromCart);
router.post("/cart", HomeController.addToCart);
router.get("/apartments/:category", HomeController.filterByCategory);

module.exports = router;
