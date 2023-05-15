const express = require("express");
const router = express.Router();
const placeConroller = require("../Controllers/placeController");
const isAdmin = require("../Middlewares/isAdmin");

router.get("/:id/history", isAdmin, placeConroller.history);

router.get("/:id", placeConroller.placeDetails);

module.exports = router;
