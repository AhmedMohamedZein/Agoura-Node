const express = require("express");
const router = express.Router();
const placeConroller = require("../Controllers/placeController");

router.get("/:id/history", placeConroller.history);

module.exports = router;
