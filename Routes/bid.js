const express = require("express");
const router = express.Router();
const bidController = require("../Controllers/bidController");


router.post("/", bidController.add);


module.exports = router;
