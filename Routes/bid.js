const express = require("express");
const router = express.Router();
const bidController = require("../Controllers/bidController");
const isUser = require("../Middlewares/isUser");


router.post("/", isUser,bidController.add);


module.exports = router;
