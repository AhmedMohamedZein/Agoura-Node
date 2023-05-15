const express = require("express");
const router = express.Router();
const placeConroller = require("../Controllers/placeController");
const isUser = require("../Middlewares/isUser");

router.get("/:id/history", placeConroller.history);

router.get("/:id", placeConroller.placeDetails);

module.exports = router;
