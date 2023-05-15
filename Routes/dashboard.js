const express = require("express");
const router = express.Router();


router.post("/", isUser,bidController.add);


module.exports = router;